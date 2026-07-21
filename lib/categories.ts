import {
  Stage2CategorySchema,
  type FindingCategory,
  type Stage2Category,
} from "@/lib/vocab";

export type CategoryColor = "amber" | "pink" | "teal";

export type CategoryInfo = {
  label: string;
  color: CategoryColor;
};

const STAGE1_INFO: CategoryInfo = { label: "Modelagem", color: "amber" };

const STAGE2_INFO: Record<Stage2Category, CategoryInfo> = {
  atividade: { label: "Atividade", color: "teal" },
  participantes: { label: "Participantes", color: "pink" },
  modelagem: { label: "Modelagem", color: "amber" },
  "dados-mensagens": { label: "Dados e mensagens", color: "teal" },
};

export function getCategoryInfo(category: FindingCategory): CategoryInfo {
  const stage2 = Stage2CategorySchema.safeParse(category);
  return stage2.success ? STAGE2_INFO[stage2.data] : STAGE1_INFO;
}
