import { z } from "zod";

export const STAGE1_CATEGORIES = [
  "AP-01",
  "AP-02",
  "AP-03",
  "AP-04",
  "AP-05",
  "AP-06",
  "AP-07",
  "AP-08",
  "AP-09",
  "AP-10",
] as const;

export const STAGE2_CATEGORIES = [
  "atividade",
  "participantes",
  "modelagem",
  "dados-mensagens",
] as const;

export const Stage1CategorySchema = z.enum(STAGE1_CATEGORIES);
export const Stage2CategorySchema = z.enum(STAGE2_CATEGORIES);
export const FindingCategorySchema = z.enum([
  ...STAGE1_CATEGORIES,
  ...STAGE2_CATEGORIES,
]);

export type Stage1Category = z.infer<typeof Stage1CategorySchema>;
export type Stage2Category = z.infer<typeof Stage2CategorySchema>;
export type FindingCategory = z.infer<typeof FindingCategorySchema>;
