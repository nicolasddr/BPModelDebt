"use client";

import { useState } from "react";
import { FindingCard } from "@/components/FindingCard";
import { AntipatternCatalog, TechDebtCatalog } from "@/components/catalogs";
import { WaitingPlaceholder } from "@/components/WaitingPlaceholder";
import { STAGE_FAILURE_LABEL, type StageResult } from "@/lib/schema";

type StageId = 1 | 2;

const STAGE_META: Record<StageId, { label: string }> = {
  1: { label: "Anti-padrões" },
  2: { label: "Dívidas técnicas" },
};

function countOf(result: StageResult | null): number | null {
  return result?.ok ? result.findings.length : null;
}

function StageBody({
  stage,
  result,
}: {
  stage: StageId;
  result: StageResult | null;
}) {
  if (result === null) {
    return (
      <WaitingPlaceholder>
        {`Aguardando conclusão do estágio ${stage}...`}
      </WaitingPlaceholder>
    );
  }

  if (!result.ok) {
    return (
      <div
        role="alert"
        className="rounded-[10px] border border-pink-bg bg-pink-bg px-4 py-3.5 text-[13px] text-pink-ink"
      >
        <span className="font-medium">{STAGE_FAILURE_LABEL[result.reason]}</span>
        {result.detail && (
          <span className="mt-0.5 block text-xs opacity-80">
            {result.detail}
          </span>
        )}
      </div>
    );
  }

  if (result.findings.length === 0) {
    return (
      <p className="rounded-[10px] border border-dashed border-border px-4 py-3.5 text-[13px] text-ink-3">
        Nenhuma ocorrência neste estágio.
      </p>
    );
  }

  return (
    <>
      {result.findings.map((finding, index) => (
        <FindingCard key={index} finding={finding} />
      ))}
    </>
  );
}

function TabButton({
  stage,
  result,
  active,
  onClick,
}: {
  stage: StageId;
  result: StageResult | null;
  active: boolean;
  onClick: () => void;
}) {
  const count = countOf(result);

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`-mb-px flex cursor-pointer items-center gap-2 border-b-2 px-1 pb-2.5 text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        active
          ? "border-accent text-ink"
          : "border-transparent text-ink-3 hover:text-ink-2"
      }`}
    >
      <span
        className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md text-xs font-medium ${
          active ? "bg-accent text-white" : "bg-s1 text-ink-3"
        }`}
      >
        {stage}
      </span>
      {STAGE_META[stage].label}
      {count !== null && <span className="text-xs text-ink-3">· {count}</span>}
    </button>
  );
}

export function FindingsList({
  stage1,
  stage2,
}: {
  stage1: StageResult | null;
  stage2: StageResult | null;
}) {
  const [active, setActive] = useState<StageId>(1);
  const stages: Record<StageId, StageResult | null> = { 1: stage1, 2: stage2 };
  const running = stage1 === null || stage2 === null;
  const total = (countOf(stage1) ?? 0) + (countOf(stage2) ?? 0);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[15px] font-medium">Ocorrências</span>
        <span className="text-xs text-ink-3">
          {running ? "Analisando…" : `${total} encontradas`}
        </span>
      </div>

      <div
        role="tablist"
        className="mb-5 flex gap-5 border-b border-border"
      >
        <div className="flex items-center gap-1.5">
          <TabButton
            stage={1}
            result={stage1}
            active={active === 1}
            onClick={() => setActive(1)}
          />
          <span className="flex pb-2.5">
            <AntipatternCatalog />
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <TabButton
            stage={2}
            result={stage2}
            active={active === 2}
            onClick={() => setActive(2)}
          />
          <span className="flex pb-2.5">
            <TechDebtCatalog />
          </span>
        </div>
      </div>

      <StageBody stage={active} result={stages[active]} />
    </div>
  );
}
