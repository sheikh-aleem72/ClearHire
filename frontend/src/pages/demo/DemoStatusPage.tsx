import { CheckCircle2, Info, ServerCog, XCircle } from "lucide-react";

import { PageBackButton } from "../../features/shared/components/PageBackButton";

const availableFeatures = [
  "Authentication",
  "Job creation and management",
  "Recruiter dashboard",
  "Resume upload and Cloudinary storage",
  "Candidate workspace",
  "Real backend APIs and database persistence",
];

const unavailableFeatures = [
  "Resume text extraction",
  "Embedding generation",
  "AI ranking and screening",
  "AI explanations and deep analysis",
  "Background worker processing",
  "Worker-based job deletion",
];

export const DemoStatusPage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-8 py-8">
      <PageBackButton to="/home" label="Back to Home" />

      <section className="rounded-3xl border border-border-default bg-bg-secondary p-8 lg:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-state-info/20 bg-state-info/10 px-4 py-2 text-state-info">
          <Info className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]">
            Demo Mode
          </span>
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-text-primary">
          Public demo status
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-text-secondary">
          This public deployment includes the recruiter-facing ClearHire experience
          and its real backend services. Background AI processing is intentionally
          unavailable here.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <FeatureList
          title="Available in this demo"
          features={availableFeatures}
          icon={CheckCircle2}
          iconClassName="text-emerald-400"
        />
        <FeatureList
          title="Temporarily unavailable"
          features={unavailableFeatures}
          icon={XCircle}
          iconClassName="text-amber-400"
        />
      </div>

      <section className="rounded-3xl border border-border-default bg-bg-secondary p-8">
        <div className="flex items-center gap-3">
          <ServerCog className="h-6 w-6 text-action-primary" />
          <h2 className="text-2xl font-bold text-text-primary">How full processing works</h2>
        </div>
        <p className="mt-4 max-w-3xl leading-7 text-text-secondary">
          ClearHire&apos;s full architecture sends work from the frontend through the
          Node.js backend and Redis to Python RQ workers. The workers process resumes
          and send results back to the backend by HTTP callback. The background worker
          infrastructure is not currently deployed in the public demo due to
          infrastructure and cost constraints.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border-subtle bg-bg-primary px-5 py-4 font-mono text-sm leading-7 text-text-secondary">
          <div>Frontend</div>
          <div>↓</div>
          <div>Node.js Backend</div>
          <div>↓</div>
          <div>Redis</div>
          <div>↓</div>
          <div>Python RQ Workers</div>
          <div>↓</div>
          <div>Resume Processing</div>
          <div>↓</div>
          <div>HTTP Callback → Backend</div>
        </div>
      </section>
    </div>
  );
};

interface FeatureListProps {
  title: string;
  features: string[];
  icon: typeof CheckCircle2;
  iconClassName: string;
}

const FeatureList = ({ title, features, icon: Icon, iconClassName }: FeatureListProps) => (
  <section className="rounded-3xl border border-border-default bg-bg-secondary p-8">
    <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
    <ul className="mt-6 space-y-4">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3 text-text-secondary">
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconClassName}`} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </section>
);
