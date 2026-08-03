import { StageCard, type StageStatus } from "@/components/StageCard";
import { STAGE_FAILURE_LABEL, type StageResult } from "@/lib/schema";

const statusOf = (result: StageResult | null): StageStatus => {
  if (result === null) return { state: "running" };
  if (!result.ok)
    return { state: "error", message: STAGE_FAILURE_LABEL[result.reason] };
  return { state: "ok", count: result.findings.length };
};

export function PipelinePanel({
  stage1,
  stage2,
}: {
  stage1: StageResult | null;
  stage2: StageResult | null;
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
            title="1 · Anti-padrões"
            status={statusOf(stage1)}
          />
        </div>
        <StageCard title="2 · Dívidas técnicas" status={statusOf(stage2)} />
      </div>
    </div>
  );
}
