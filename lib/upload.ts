export const ACCEPTED_EXTENSIONS = [".bpmn", ".xml"];

export const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.join(",");

export const INVALID_FORMAT_MESSAGE = "Formato inválido — use .bpmn ou .xml.";

export const NO_FILE_MESSAGE = "Selecione um arquivo .bpmn ou .xml.";

export function hasAcceptedExtension(filename: string): boolean {
  const nome = filename.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => nome.endsWith(ext));
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}
