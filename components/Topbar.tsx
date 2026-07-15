import { IconGitBranch, IconUpload } from "@tabler/icons-react";

export function Topbar() {
  return (
    <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-border bg-s0 px-[22px] py-[14px]">
      <div className="flex items-center gap-[9px] text-[15px] font-medium">
        <IconGitBranch size={19} className="text-accent" stroke={1.75} />
      </div>
      <button className="inline-flex h-[34px] items-center gap-1.5 rounded border border-border-strong bg-transparent px-3.5 text-[13px] text-ink hover:bg-s1">
        <IconUpload size={16} stroke={1.75} />
        Novo modelo
      </button>
    </div>
  );
}
