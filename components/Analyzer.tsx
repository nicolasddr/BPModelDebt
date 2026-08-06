"use client";

import { IconFileExport, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import { runStage1, runStage2, uploadModel } from "@/app/actions";
import { Button } from "@/components/Button";
import { FindingsList } from "@/components/FindingsList";
import { ModelHeader } from "@/components/ModelHeader";
import { ModelUpload } from "@/components/ModelUpload";
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

  async function analisar(file: File) {
    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.set("model", file);

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
      <ModelUpload
        uploading={uploading}
        error={error}
        onAnalisar={(file) => void analisar(file)}
      />
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
