import { getCategoryInfo } from "@/lib/categories";
import type { Finding, StageResult } from "@/lib/schema";

const STAGE_LABEL: Record<Finding["stage"], string> = {
  1: "Anti-padrões",
  2: "Dívidas técnicas",
};

const COLUMNS: { header: string; value: (finding: Finding) => string }[] = [
  { header: "Estágio", value: (f) => STAGE_LABEL[f.stage] },
  { header: "Categoria", value: (f) => getCategoryInfo(f.category).label },
  { header: "Código", value: (f) => f.category },
  { header: "Título", value: (f) => f.title },
  { header: "Descrição", value: (f) => f.description },
  { header: "Elemento BPMN", value: (f) => f.bpmn_element.id },
  { header: "Nome do elemento", value: (f) => f.bpmn_element.name ?? "" },
  { header: "Referência", value: (f) => getCategoryInfo(f.category).reference },
  { header: "Recomendação", value: (f) => f.recommendation },
];

function escapeField(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function toRow(values: string[]): string {
  return values.map(escapeField).join(",");
}

export function flattenFindings(
  stage1: StageResult | null,
  stage2: StageResult | null,
): Finding[] {
  return [stage1, stage2].flatMap((result) =>
    result?.ok ? result.findings : [],
  );
}

const BOM = "﻿";

export function findingsToCsv(findings: Finding[]): string {
  const header = toRow(COLUMNS.map((column) => column.header));
  const rows = findings.map((finding) =>
    toRow(COLUMNS.map((column) => column.value(finding))),
  );
  return BOM + [header, ...rows].join("\r\n");
}
