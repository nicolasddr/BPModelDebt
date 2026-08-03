"use client";

import { IconChevronRight, IconMapPin } from "@tabler/icons-react";
import { useState } from "react";
import { getCategoryInfo } from "@/lib/categories";
import type { Finding } from "@/lib/schema";

const COLOR_CLASSES = {
  amber: "bg-amber-bg text-amber-ink",
  pink: "bg-pink-bg text-pink-ink",
  teal: "bg-teal-bg text-teal-ink",
} as const;

export function FindingCard({ finding }: { finding: Finding }) {
  const [open, setOpen] = useState(false);
  const category = getCategoryInfo(finding.category);

  return (
    <div className="mb-2.5 rounded-[10px] border border-border bg-s2">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset rounded-[10px]"
      >
        <IconChevronRight
          size={16}
          stroke={2}
          className={`shrink-0 text-ink-3 transition-transform ${open ? "rotate-90" : ""}`}
        />
        <span
          className={`rounded px-2.5 py-[3px] text-[11px] font-medium ${COLOR_CLASSES[category.color]}`}
        >
          {category.label}
        </span>
        <span className="text-sm font-medium">{finding.title}</span>
      </button>
      {open && (
        <div className="px-4 pb-3.5">
          <p className="mb-2.5 text-[13px] text-ink-2">{finding.description}</p>
          <div className="flex flex-wrap gap-4 border-t border-border pt-2.5 text-xs text-ink-3">
            <span className="inline-flex items-center gap-1">
              <IconMapPin size={14} stroke={1.75} />
              <code className="rounded bg-s1 px-1.5 py-px font-mono text-[11px] text-ink-2">
                {finding.bpmn_element.id}
              </code>
            </span>
            <span className="rounded bg-teal-bg px-1.5 py-px text-teal-ink">
              {finding.reference}
            </span>
            <span>Correção: {finding.recommendation}</span>
          </div>
        </div>
      )}
    </div>
  );
}
