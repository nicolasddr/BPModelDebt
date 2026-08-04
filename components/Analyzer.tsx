"use client";

import { IconFileExport, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { runStage1, runStage2, uploadModel } from "@/app/actions";
import { Button } from "@/components/Button";
import { FindingsList } from "@/components/FindingsList";
import { ModelHeader } from "@/components/ModelHeader";
import { PipelinePanel } from "@/components/PipelinePanel";
import { findingsToCsv, flattenFindings } from "@/lib/export/csv";
import type { StageResult, StageRun } from "@/lib/schema";

type Analysis = {
  filename: string;
  stage1: StageResult | null;
  stage2: StageResult | null;
};

function runOf(...stages: (StageResult | null)[]): StageRun | null {
  for (const stage of stages) {
    if (stage?.ok) return stage.run;
  }
  return null;
}

function csvFilename(modelFilename: string): string {
  const base = modelFilename.replace(/\.[^.]+$/, "");
  return `${base}-analise.csv`;
}

function downloadCsv(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

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
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [filename, setFilename] = useState<string | null>(null);

  async function analisar(formData: FormData) {
    setError(null);
    setUploading(true);

    const upload = await uploadModel(formData);

    if (!upload.ok) {
      setUploading(false);
      setError(upload.message);
      return;
    }

    const { filename: nome, xml } = upload;
    setAnalysis({ filename: nome, stage1: null, stage2: null });

    const result1 = await runStage1(xml);
    setAnalysis({ filename: nome, stage1: result1, stage2: null });

    const result2 = await runStage2(xml);
    setAnalysis({ filename: nome, stage1: result1, stage2: result2 });
  }

  if (analysis === null) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void analisar(new FormData(e.currentTarget));
        }}
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

        {error && (
          <p role="alert" className="mt-3 text-[13px] text-pink">
            {error}
          </p>
        )}

        <Button type="submit" disabled={uploading} className="mt-5">
          {uploading ? "Lendo…" : "Analisar"}
        </Button>
      </form>
    );
  }

  const running = analysis.stage1 === null || analysis.stage2 === null;
  const findings = flattenFindings(analysis.stage1, analysis.stage2);
  const modelFilename = analysis.filename;

  function exportar() {
    downloadCsv(csvFilename(modelFilename), findingsToCsv(findings));
  }

  return (
    <>
      <ModelHeader
        filename={analysis.filename}
        run={runOf(analysis.stage1, analysis.stage2)}
      />
      <PipelinePanel stage1={analysis.stage1} stage2={analysis.stage2} />
      <FindingsList stage1={analysis.stage1} stage2={analysis.stage2} />

      <div className="mt-5 flex justify-end gap-2.5">
        <Button type="button" variant="secondary" onClick={onNovoModelo} disabled={running}>
          <IconUpload size={16} stroke={1.75} />
          Novo modelo
        </Button>
        <Button type="button" onClick={exportar} disabled={running || findings.length === 0}>
          <IconFileExport size={16} stroke={1.75} />
          Exportar .csv
        </Button>
      </div>
    </>
  );
}
