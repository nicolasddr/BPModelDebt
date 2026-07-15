import { IconMapPin } from "@tabler/icons-react";
import { getCategoryInfo } from "@/lib/categories";
import type { Finding } from "@/lib/schema";

const COLOR_CLASSES = {
  amber: "bg-amber-bg text-amber-ink",
  pink: "bg-pink-bg text-pink-ink",
  teal: "bg-teal-bg text-teal-ink",
} as const;

export function FindingCard({ finding }: { finding: Finding }) {
  const category = getCategoryInfo(finding.category);

  return (
    <div className="mb-2.5 rounded-[10px] border border-border bg-s2 px-4 py-3.5">
      <div className="mb-2 flex flex-wrap items-center gap-2.5">
        <span
          className={`rounded px-2.5 py-[3px] text-[11px] font-medium ${COLOR_CLASSES[category.color]}`}
        >
          {category.label}
        </span>
        <span className="text-sm font-medium">{finding.title}</span>
      </div>
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
  );
}
