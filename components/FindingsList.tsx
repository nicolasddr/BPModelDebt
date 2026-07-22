import { FindingCard } from "@/components/FindingCard";
import { WaitingPlaceholder } from "@/components/WaitingPlaceholder";
import { STAGE_FAILURE_LABEL, type StageResult } from "@/lib/schema";

type StageId = 1 | 2;

const STAGE_META: Record<StageId, { label: string; badge: string }> = {
  1: { label: "Anti-padrões", badge: "bg-ok-bg text-ok" },
  2: { label: "Dívidas técnicas", badge: "bg-ok-bg text-ok" },
};

function StageSection({
  stage,
  result,
}: {
  stage: StageId;
  result: StageResult | null;
}) {
  const meta = STAGE_META[stage];

  return (
    <section className="mb-6 last:mb-0">
      <div className="mb-3 flex items-center gap-2.5">
        <span
          className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md text-xs font-medium ${meta.badge}`}
        >
          {stage}
        </span>
        <span className="text-[13px] font-medium">{meta.label}</span>
        {result?.ok && (
          <span className="text-xs text-ink-3">· {result.findings.length}</span>
        )}
      </div>
      {result === null ? (
        <WaitingPlaceholder>
          {`Aguardando conclusão do estágio ${stage}...`}
        </WaitingPlaceholder>
      ) : !result.ok ? (
        <div
          role="alert"
          className="rounded-[10px] border border-pink-bg bg-pink-bg px-4 py-3.5 text-[13px] text-pink-ink"
        >
          <span className="font-medium">
            {STAGE_FAILURE_LABEL[result.reason]}
          </span>
          {result.detail && (
            <span className="mt-0.5 block text-xs opacity-80">
              {result.detail}
            </span>
          )}
        </div>
      ) : result.findings.length > 0 ? (
        result.findings.map((finding, index) => (
          <FindingCard key={index} finding={finding} />
        ))
      ) : (
        <p className="rounded-[10px] border border-dashed border-border px-4 py-3.5 text-[13px] text-ink-3">
          Nenhuma ocorrência neste estágio.
        </p>
      )}
    </section>
  );
}

export function FindingsList({
  stage1,
  stage2,
}: {
  stage1: StageResult | null;
  stage2: StageResult | null;
}) {
  const stages = [stage1, stage2];
  const running = stages.some((stage) => stage === null);
  const total = stages.reduce(
    (soma, stage) => soma + (stage?.ok ? stage.findings.length : 0),
    0,
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[15px] font-medium">Ocorrências</span>
        <span className="text-xs text-ink-3">
          {running ? "Analisando…" : `${total} encontradas`}
        </span>
      </div>
      <StageSection stage={1} result={stage1} />
      <StageSection stage={2} result={stage2} />
    </div>
  );
}
