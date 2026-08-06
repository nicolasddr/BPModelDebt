import { z } from "zod";
import { FindingCategorySchema } from "@/lib/vocab";

export type ModelMeta = {
  filename: string;
  atividades: number;
  gateways: number;
  pools: number;
};

export const BpmnElementRefSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  type: z.string().nullable(),
});

export const FindingSchema = z.object({
  stage: z.literal([1, 2]),
  category: FindingCategorySchema,
  title: z.string(),
  description: z.string(),
  bpmn_element: BpmnElementRefSchema,
  recommendation: z.string(),
});

export const StageResponseSchema = z.object({
  findings: z.array(FindingSchema),
});

export type BpmnElementRef = z.infer<typeof BpmnElementRefSchema>;
export type Finding = z.infer<typeof FindingSchema>;
export type StageResponse = z.infer<typeof StageResponseSchema>;

export type StageRun = {
  llm: string;
  promptVersion: string;
};

export type StageFailure = "refusal" | "truncated" | "invalid" | "failed";

export const STAGE_FAILURE_LABEL: Record<StageFailure, string> = {
  refusal: "O modelo recusou a análise",
  truncated: "Resposta cortada por limite de tokens",
  invalid: "Resposta fora do formato esperado",
  failed: "Falha na chamada ao modelo",
};

export type StageResult =
  | { ok: true; run: StageRun; findings: Finding[] }
  | { ok: false; reason: StageFailure; detail: string };
