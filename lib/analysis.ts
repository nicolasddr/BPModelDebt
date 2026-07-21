import type { Finding } from "@/lib/schema";
import { mockFindings } from "@/mock/findings";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function runStage1(_xml: string): Promise<Finding[]> {
  await sleep(700);
  return mockFindings.filter((f) => f.stage === 1);
}

export async function runStage2(_xml: string): Promise<Finding[]> {

  await sleep(1200);
  return mockFindings.filter((f) => f.stage === 2);
}
