import { useParams } from "react-router-dom";
import { useResumeProcessing } from "../../features/resume/hooks/useResumeProcessing";
import { ResumeLoading } from "../../features/resume/components/ResumeLoading";
import { ResumeError } from "../../features/resume/components/ResumeError";
import { ResumeProcessing } from "../../features/resume/components/ResumeProcessing";
import { PageBackButton } from "../../features/shared/components/PageBackButton";
import { ResumeHero } from "../../features/resume/components/ResumeHero";
import { DeepAnalysis } from "../../features/resume/components/DeepAnalysis";
import { ResumeViewer } from "../../features/resume/components/ResumeViewer";
import { DemoNotice } from "../../features/shared/components/DemoNotice";

export const ResumeDetailPage = () => {
  const { resumeId } = useParams();

  const { data, isLoading, isError, error, refetch } = useResumeProcessing(
    resumeId!
  );

  /* ---------------- Loading ---------------- */

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <ResumeLoading />
      </div>
    );
  }

  /* ---------------- Error ---------------- */

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <ResumeError
          message={(error as Error)?.message ?? "Unable to load resume."}
          onRetry={refetch}
        />
      </div>
    );
  }

  /* ---------------- Processing ---------------- */

  const processing =
    data.status !== "completed" ||
    data.analysisStatus === "queued" ||
    data.analysisStatus === "processing";

  if (processing) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <ResumeProcessing
          resumeUrl={data.resumeUrl}
          externalResumeId={data.externalResumeId}
          createdAt={data.createdAt}
          updatedAt={data.updatedAt}
          status={data.status}
          passFail={data.passFail}
          rank={data.rank}
          finalScore={data.finalScore}
        />
      </div>
    );
  }

  /* ---------------- Completed ---------------- */

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-8">
      <PageBackButton />

      <ResumeHero
        externalResumeId={data.externalResumeId}
        finalScore={data.finalScore}
        rank={data.rank}
        passFail={data.passFail}
        status={data.status}
        createdAt={data.createdAt}
        updatedAt={data.updatedAt}
      />

      <DemoNotice title="AI screening is unavailable in Demo Mode.">
        This resume was successfully uploaded and stored. Resume processing
        requires background worker infrastructure that is not currently deployed
        in the public demo.
      </DemoNotice>

      <DeepAnalysis
        analysis={data.analysis}
        analysisStatus={data.analysisStatus}
        analysisCompletedAt={data.updatedAt}
        onRunAnalysis={() => undefined}
        isRunning={false}
        isDemoMode
      />

      <ResumeViewer resumeUrl={data.resumeUrl} />
    </div>
  );
};
