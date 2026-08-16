import { IJob, JobModel } from '../schema/job.model';
import {
  createJob,
  findJobById,
  getJobsByRecruiter,
  updateJobById,
} from '../repositories/job.repository';
import { AppError } from '../utils/AppErrors';
import { ResumeProcessing, ResumeProcessingDocument } from '../schema/resumeProcessings.model.';
import mongoose, { FilterQuery, PipelineStage } from 'mongoose';
// import { publishRQDeleteJob } from '../queues/deletePublisher';

interface GetJobResumesParams {
  jobId: string;
  page: number;
  limit: number;
  status?: string | undefined;
  passFail?: string | undefined;
}

interface GetJobUpdatesParams {
  jobId: string;
  recruiterId: string;
  since: Date | null;
}

export const createJobService = async (payload: Partial<IJob>) => {
  // Basic business validation can go here (e.g., ensure required_skills not empty)
  if (!payload.title) throw new Error('Job title required');

  if (!payload.required_skills || payload.required_skills.length === 0) {
    throw new AppError('required_skills must include at least one skill', 400);
  }

  if (!payload.createdBy) {
    throw new AppError("Creator's id is required!", 400);
  }

  return createJob(payload);
};

export const getJobByIdService = async (id: string, recruiterId: string) => {
  const job = await findJobById(id, recruiterId);
  if (!job) throw new AppError('Job not found', 404);
  return job;
};

export const updateJobService = async (id: string, update: Partial<IJob>) => {
  const job = await updateJobById(id, update);
  if (!job) throw new Error('Job not found or update failed');
  return job;
};

export const deleteJobService = async (id: string) => {
  // ------------------------------
  // STEP 1 — Validate job
  // ------------------------------
  const job = await JobModel.findById(id);

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  // 2. Check if job is already being deleted
  if (job.status === 'deleting') {
    throw new AppError('Job is already being deleted', 400);
  }

  // 3. Mark job status="deleting"
  job.status = 'deleting';
  await job.save();

  // Publish job for cleanup
  // await publishRQDeleteJob(id);

  // Return accepted to the frontend
  return {
    message: 'Job deletion initiated',
  };
};

export const getJobsByRecruiterService = async (recruiterId: string) => {
  return getJobsByRecruiter(recruiterId);
};

export const getJobResumes = async ({
  jobId,
  page,
  limit,
  status,
  passFail,
}: GetJobResumesParams) => {
  // 1. Ownership guard
  const job = await JobModel.findOne({ _id: jobId }).select('_id');
  if (!job) {
    throw new AppError('Job not found', 404);
  }

  // 2. Build filters
  const filter: FilterQuery<ResumeProcessingDocument> = {
    jobDescriptionId: new mongoose.Types.ObjectId(jobId),
  };

  if (status) {
    filter.status = status;
  }

  if (passFail) {
    filter.passFail = passFail; // assumes stored by worker
  }

  // 3. Query resumes
  const matchStage = { $match: filter };

  const pipeline: PipelineStage[] = [matchStage];

  if (filter.passFail === 'failed') {
    pipeline.push({
      $sort: { createdAt: -1 },
    });
  } else {
    pipeline.push(
      {
        $addFields: {
          normalizedRank: {
            $ifNull: ['$rank', 999999],
          },
        },
      },
      {
        $sort: {
          normalizedRank: 1,
          createdAt: 1,
        },
      },
    );
  }

  pipeline.push(
    { $skip: (page - 1) * limit },
    { $limit: limit },
    {
      $project: {
        resumeObjectId: 1,
        externalResumeId: 1,
        rank: 1,
        finalScore: 1,
        status: 1,
        passFail: 1,
        analysisStatus: 1,
        explanation: 1,
        createdAt: 1,
        rankingStatus: 1,
      },
    },
  );

  const [resumes, total] = await Promise.all([
    ResumeProcessing.aggregate(pipeline),
    ResumeProcessing.countDocuments(filter),
  ]);

  return {
    page,
    limit,
    total,
    resumes,
  };
};

export const getJobUpdates = async ({ jobId, recruiterId, since }: GetJobUpdatesParams) => {
  // 1️⃣ Ownership guard
  const job = await JobModel.findOne({
    _id: jobId,
    createdBy: recruiterId,
  }).select('_id');

  if (!job) {
    throw new AppError('Job not found or unauthorized', 404);
  }

  // 2️⃣ Build filter
  const filter: FilterQuery<ResumeProcessingDocument> = {
    jobDescriptionId: jobId,
  };

  if (since) {
    filter.updatedAt = { $gt: since };
  }

  // 3️⃣ Fetch only minimal changed fields
  const resumes = await ResumeProcessing.find(filter)
    .select({
      _id: 1,
      status: 1,
      analysisStatus: 1,
      passFail: 1,
      rank: 1,
      finalScore: 1,
      explanation: 1,
      updatedAt: 1,
    })
    .sort({ updatedAt: 1 })
    .lean();

  return {
    jobId,
    serverTime: new Date().toISOString(),
    updates: resumes.map((r) => ({
      resumeId: r._id,
      status: r.status,
      analysisStatus: r.analysisStatus,
      passFail: r.passFail,
      rank: r.rank,
      finalScore: r.finalScore,
      explanation: r.explanation,
      updatedAt: r.updatedAt,
    })),
  };
};
