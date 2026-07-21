"use server";

import * as analysis from "@/lib/analysis";
import type { StageResult } from "@/lib/schema";

export type UploadResult =
  | { ok: false; message: string }
  | { ok: true; filename: string; xml: string };

const ACCEPTED = [".bpmn", ".xml"];

export async function uploadModel(formData: FormData): Promise<UploadResult> {
  const file = formData.get("model");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Selecione um arquivo .bpmn ou .xml." };
  }

  const nome = file.name.toLowerCase();
  if (!ACCEPTED.some((ext) => nome.endsWith(ext))) {
    return { ok: false, message: "Formato inválido — use .bpmn ou .xml." };
  }

  return { ok: true, filename: file.name, xml: await file.text() };
}

export async function runStage1(xml: string): Promise<StageResult> {
  return analysis.runStage1(xml);
}

export async function runStage2(xml: string): Promise<StageResult> {
  return analysis.runStage2(xml);
}
