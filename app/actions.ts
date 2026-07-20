"use server";

export type AnalyzeState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "ready"; filename: string; size: number; xml: string };

const ACCEPTED = [".bpmn", ".xml"];

export async function analyzeModel(
  _prev: AnalyzeState,
  formData: FormData,
): Promise<AnalyzeState> {
  const file = formData.get("model");

  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", message: "Selecione um arquivo .bpmn ou .xml." };
  }

  const nome = file.name.toLowerCase();
  if (!ACCEPTED.some((ext) => nome.endsWith(ext))) {
    return { status: "error", message: "Formato inválido — use .bpmn ou .xml." };
  }

  const xml = await file.text();

  return { status: "ready", filename: file.name, size: file.size, xml };
}
