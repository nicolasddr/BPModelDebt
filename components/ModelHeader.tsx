import {
  IconArrowsSplit2,
  IconBox,
  IconFileTypeXml,
  IconLayoutRows,
  IconSparkles,
} from "@tabler/icons-react";
import type { ModelMeta } from "@/lib/schema";

export function ModelHeader({ meta }: { meta: ModelMeta }) {
  return (
    <div className="mb-[22px] flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-border bg-s1 text-ink-2">
          <IconFileTypeXml size={22} stroke={1.75} />
        </div>
        <div>
          <h1 className="text-[19px] font-medium">{meta.filename}</h1>
          <div className="mt-0.5 flex flex-wrap gap-3.5 text-xs text-ink-3">
            <span className="inline-flex items-center gap-1">
              <IconBox size={14} stroke={1.75} />
              {meta.atividades} atividades
            </span>
            <span className="inline-flex items-center gap-1">
              <IconArrowsSplit2 size={14} stroke={1.75} />
              {meta.gateways} gateways
            </span>
            <span className="inline-flex items-center gap-1">
              <IconLayoutRows size={14} stroke={1.75} />
              {meta.pools} pools
            </span>
          </div>
        </div>
      </div>
      <span className="rounded border border-accent-border bg-accent-bg px-[11px] py-[5px] text-xs text-accent">
        <IconSparkles size={13} stroke={1.75} className="mr-1 inline -translate-y-px" />
        Opus 4.8 · prompt v2.1
      </span>
    </div>
  );
}
