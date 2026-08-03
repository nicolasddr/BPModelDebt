import { IconFileTypeXml } from "@tabler/icons-react";
import type { StageRun } from "@/lib/schema";

export function ModelHeader({
  filename,
  run,
}: {
  filename: string;
  run: StageRun | null;
}) {
  return (
    <div className="mb-[22px] flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-border bg-s1 text-ink-2">
          <IconFileTypeXml size={22} stroke={1.75} />
        </div>
        <h1 className="text-[19px] font-medium">{filename}</h1>
      </div>
      {run && (
        <span className="rounded border border-accent-border bg-accent-bg px-[11px] py-[5px] text-xs text-accent">
          {run.llm}
        </span>
      )}
    </div>
  );
}
