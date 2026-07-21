import * as mock from "@/lib/analysis/mock";
import * as openai from "@/lib/analysis/openai";
import type { StageResult } from "@/lib/schema";

export async function runStage1(xml: string): Promise<StageResult> {
  return openai.runStage1(xml);
}

export async function runStage2(xml: string): Promise<StageResult> {
  return mock.runStage2(xml);
}
