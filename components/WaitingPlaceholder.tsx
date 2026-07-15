import { IconDots } from "@tabler/icons-react";

export function WaitingPlaceholder({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[10px] border border-dashed border-border-strong bg-s1 px-4 py-3.5 text-[13px] text-ink-3">
      <IconDots size={16} stroke={1.75} />
      {children}
    </div>
  );
}
