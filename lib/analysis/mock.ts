import {
  StageResponseSchema,
  type StageResult,
  type StageRun,
} from "@/lib/schema";
import { mockFindings } from "@/mock/findings";

const MOCK_RUN: StageRun = { llm: "mock", promptVersion: "v0.0" };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function mockStage(stage: 1 | 2): StageResult {
  const { findings } = StageResponseSchema.parse({
    findings: mockFindings.filter((f) => f.stage === stage),
  });
  return { ok: true, run: MOCK_RUN, findings };
}

export async function runStage1(_xml: string): Promise<StageResult> {
  await sleep(700);
  return mockStage(1);
}

export async function runStage2(_xml: string): Promise<StageResult> {
  await sleep(1200);
  return mockStage(2);
}
