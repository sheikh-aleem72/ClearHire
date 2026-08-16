import { Info } from "lucide-react";
import type { ReactNode } from "react";

interface DemoNoticeProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const DemoNotice = ({ title, children, className = "" }: DemoNoticeProps) => {
  return (
    <section
      className={`rounded-2xl border border-state-info/20 bg-state-info/10 px-5 py-4 ${className}`}
      role="status"
    >
      <div className="flex items-start gap-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-state-info" />
        <div>
          <h2 className="font-semibold text-text-primary">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-text-secondary">{children}</p>
        </div>
      </div>
    </section>
  );
};
