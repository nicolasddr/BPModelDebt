import type { FindingCategory } from "@/lib/schema";

export type CategoryColor = "amber" | "pink" | "teal";

export type CategoryInfo = {
  label: string;
  color: CategoryColor;
};

// Vocabulário fechado (seção F). Estágio 2 é definitivo; estágio 1 (AP-xx)
// é provisório até o codebook completo (`Anti_Padroes.md`) chegar.
const CATEGORY_LABELS: Record<string, CategoryInfo> = {
  atividade: { label: "Atividade", color: "teal" },
  participantes: { label: "Participantes", color: "pink" },
  modelagem: { label: "Modelagem", color: "amber" },
  "dados-mensagens": { label: "Dados e mensagens", color: "teal" },
  "AP-04": { label: "Modelagem", color: "amber" },
  "AP-07": { label: "Modelagem", color: "amber" },
};

export function getCategoryInfo(category: FindingCategory): CategoryInfo {
  return CATEGORY_LABELS[category] ?? { label: category, color: "teal" };
}
