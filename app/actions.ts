"use server";

import * as analysis from "@/lib/analysis";
import type { StageResult } from "@/lib/schema";
import {
  hasAcceptedExtension,
  INVALID_FORMAT_MESSAGE,
  NO_FILE_MESSAGE,
} from "@/lib/upload";

export type UploadResult =
  | { ok: false; message: string }
  | { ok: true; filename: string; xml: string };

export async function uploadModel(formData: FormData): Promise<UploadResult> {
  const file = formData.get("model");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: NO_FILE_MESSAGE };
  }

  if (!hasAcceptedExtension(file.name)) {
    return { ok: false, message: INVALID_FORMAT_MESSAGE };
  }

  return { ok: true, filename: file.name, xml: await file.text() };
}

export async function runStage1(xml: string): Promise<StageResult> {
  return analysis.runStage1(xml);
}

export async function runStage2(xml: string): Promise<StageResult> {
  return analysis.runStage2(xml);
}
