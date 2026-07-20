import type { ReactNode } from "react";
import { FindingCard } from "@/components/FindingCard";
import { WaitingPlaceholder } from "@/components/WaitingPlaceholder";
import type { Finding } from "@/lib/schema";

type StageId = 1 | 2;

const STAGE_META: Record<StageId, { label: string; badge: string }> = {
  1: { label: "Anti-padrões", badge: "bg-ok-bg text-ok" },
  2: { label: "Dívidas técnicas", badge: "bg-run-bg text-run" },
};

function StageSection({
  stage,
  findings,
  children,
}: {
  stage: StageId;
  findings: Finding[];
  children?: ReactNode;
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
        <span className="text-xs text-ink-3">· {findings.length}</span>
      </div>
      {findings.length > 0 ? (
        findings.map((finding) => (
          <FindingCard key={finding.bpmn_element.id} finding={finding} />
        ))
      ) : (
        <p className="rounded-[10px] border border-dashed border-border px-4 py-3.5 text-[13px] text-ink-3">
          Nenhuma ocorrência neste estágio.
        </p>
      )}
      {children}
    </section>
  );
}

export function FindingsList({ findings }: { findings: Finding[] }) {
  const stage1 = findings.filter((f) => f.stage === 1);
  const stage2 = findings.filter((f) => f.stage === 2);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[15px] font-medium">Ocorrências</span>
        <span className="text-xs text-ink-3">{findings.length} encontradas</span>
      </div>
      <StageSection stage={1} findings={stage1} />
      <StageSection stage={2} findings={stage2}>
        <WaitingPlaceholder>
          Aguardando conclusão do estágio 2...
        </WaitingPlaceholder>
      </StageSection>
    </div>
  );
}
