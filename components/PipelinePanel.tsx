import { StageCard, type StageStatus } from "@/components/StageCard";
import type { Finding } from "@/lib/schema";

const statusOf = (findings: Finding[] | null): StageStatus =>
  findings === null
    ? { state: "running" }
    : { state: "ok", count: findings.length };

export function PipelinePanel({
  stage1,
  stage2,
}: {
  stage1: Finding[] | null;
  stage2: Finding[] | null;
}) {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-border bg-s2">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium">Pipeline de análise</span>
        <span className="text-xs text-ink-3">2 estágios</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="border-b border-border sm:border-r sm:border-b-0">
          <StageCard
            title="1 · Qualidade e anti-padrões"
            status={statusOf(stage1)}
          />
        </div>
        <StageCard title="2 · Dívidas técnicas" status={statusOf(stage2)} />
      </div>
    </div>
  );
}
