import { StageCard } from "@/components/StageCard";

export function PipelinePanel() {
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
            status={{ state: "ok", count: 3 }}
          />
        </div>
        <StageCard
          title="2 · Dívidas técnicas"
          status={{ state: "running", progress: 55 }}
        />
      </div>
    </div>
  );
}
