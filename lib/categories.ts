import { TECH_DEBTS } from "@/lib/catalog";
import {
  ANTIPATTERN_REFERENCE_SHORT,
  TECHDEBT_REFERENCE_SHORT,
} from "@/lib/reference";
import {
  Stage2CategorySchema,
  type FindingCategory,
  type Stage2Category,
} from "@/lib/vocab";

export type CategoryColor = "amber" | "pink" | "teal";

export type CategoryInfo = {
  label: string;
  color: CategoryColor;
  reference: string;
};

function debtGroupLabel(code: Stage2Category): string {
  const group = TECH_DEBTS.find((g) =>
    g.items.some((item) => item.code === code),
  );
  return group ? group.label : "Dívida técnica";
}

export function getCategoryInfo(category: FindingCategory): CategoryInfo {
  const stage2 = Stage2CategorySchema.safeParse(category);

  if (stage2.success) {
    return {
      label: debtGroupLabel(stage2.data),
      color: "teal",
      reference: `${TECHDEBT_REFERENCE_SHORT} · ${stage2.data}`,
    };
  }

  return {
    label: "Modelagem",
    color: "teal",
    reference: `${ANTIPATTERN_REFERENCE_SHORT} · ${category}`,
  };
}
