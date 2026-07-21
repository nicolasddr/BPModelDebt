import { StageResponseSchema, type Finding } from "@/lib/schema";
import { mockFindings } from "@/mock/findings";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function mockStageResponse(stage: 1 | 2): Finding[] {
  const { findings } = StageResponseSchema.parse({
    findings: mockFindings.filter((f) => f.stage === stage),
  });
  return findings;
}

export async function runStage1(_xml: string): Promise<Finding[]> {
  await sleep(700);
  return mockStageResponse(1);
}

export async function runStage2(_xml: string): Promise<Finding[]> {
  await sleep(1200);
  return mockStageResponse(2);
}
