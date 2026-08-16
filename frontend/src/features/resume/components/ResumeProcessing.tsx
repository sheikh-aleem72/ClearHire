import { PageBackButton } from "../../shared/components/PageBackButton";
import { ResumeHero } from "./ResumeHero";
import { ResumeViewer } from "./ResumeViewer";
import { DemoNotice } from "../../shared/components/DemoNotice";

interface ResumeProcessingProps {
  resumeUrl: string;

  externalResumeId: string;

  createdAt: string;

  updatedAt: string;

  status: string;

  passFail: string;

  rank: number | null;

  finalScore: number | null;
}

export const ResumeProcessing = ({
  resumeUrl,
  externalResumeId,
  createdAt,
  updatedAt,
  status,
  passFail,
  rank,
  finalScore,
}: ResumeProcessingProps) => {
  return (
    <div className="space-y-10">
      <PageBackButton />

      <ResumeHero
        externalResumeId={externalResumeId}
        createdAt={createdAt}
        updatedAt={updatedAt}
        status={status}
        passFail={passFail}
        rank={rank}
        finalScore={finalScore}
      />

      <DemoNotice title="AI screening is unavailable in Demo Mode.">
        This resume was successfully uploaded and stored. Text extraction,
        ranking, and AI evaluation require background worker infrastructure
        that is not currently deployed in the public demo.
      </DemoNotice>

      <ResumeViewer resumeUrl={resumeUrl} />
    </div>
  );
};
