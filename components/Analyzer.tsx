"use client";

import { IconFileExport, IconUpload } from "@tabler/icons-react";
import { useActionState, useState } from "react";
import { analyzeModel } from "@/app/actions";
import { FindingsList } from "@/components/FindingsList";
import { ModelHeader } from "@/components/ModelHeader";
import { PipelinePanel } from "@/components/PipelinePanel";
import { mockFindings } from "@/mock/findings";

export function Analyzer() {
  const [nonce, setNonce] = useState(0);
  return (
    <AnalyzerInner
      key={nonce}
      onNovoModelo={() => setNonce((n) => n + 1)}
    />
  );
}

function AnalyzerInner({ onNovoModelo }: { onNovoModelo: () => void }) {
  const [state, formAction, pending] = useActionState(analyzeModel, {
    status: "idle",
  });

  const [filename, setFilename] = useState<string | null>(null);

  if (state.status !== "ready") {
    return (
      <form
        action={formAction}
        className="mx-auto mt-16 max-w-[440px] rounded-xl border border-border bg-s2 px-6 py-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-[10px] border border-border bg-s1 text-ink-2">
          <IconUpload size={22} stroke={1.75} />
        </div>
        <h1 className="text-[17px] font-medium">Novo modelo</h1>
        <p className="mt-1 text-[13px] text-ink-3">
          Envie um arquivo BPMN (.bpmn ou .xml) para analisar.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <label className="inline-flex h-[34px] shrink-0 cursor-pointer items-center gap-1.5 rounded border border-border-strong bg-s1 px-3.5 text-[13px] text-ink hover:bg-s1/70 focus-within:outline-none focus-within:ring-2 focus-within:ring-accent">
            <IconUpload size={16} stroke={1.75} />
            Escolher arquivo
            <input
              type="file"
              name="model"
              accept=".bpmn,.xml"
              className="sr-only"
              onChange={(e) => setFilename(e.target.files?.[0]?.name ?? null)}
            />
          </label>
          <span className="truncate text-left text-[13px] text-ink-3">
            {filename ?? "Nenhum arquivo selecionado"}
          </span>
        </div>

        {state.status === "error" && (
          <p role="alert" className="mt-3 text-[13px] text-pink">
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-5 inline-flex h-[34px] items-center gap-1.5 rounded border border-accent bg-accent px-3.5 text-[13px] text-white hover:bg-accent/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {pending ? "Lendo…" : "Analisar"}
        </button>
      </form>
    );
  }

  return (
    <>
      <ModelHeader
        meta={{
          filename: state.filename,
          atividades: 0,
          gateways: 0,
          pools: 0,
        }}
      />
      <PipelinePanel />
      <FindingsList findings={mockFindings} />

      <div className="mt-5 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onNovoModelo}
          className="inline-flex h-[34px] items-center gap-1.5 rounded border border-border-strong bg-transparent px-3.5 text-[13px] text-ink hover:bg-s1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <IconUpload size={16} stroke={1.75} />
          Novo modelo
        </button>
        <button
          type="button"
          className="inline-flex h-[34px] items-center gap-1.5 rounded border border-accent bg-accent px-3.5 text-[13px] text-white hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <IconFileExport size={16} stroke={1.75} />
          Exportar relatório
        </button>
      </div>
    </>
  );
}
