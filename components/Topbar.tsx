import { IconGitBranch } from "@tabler/icons-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-[2] flex items-center justify-between border-b border-border bg-s0 px-[22px] py-[14px]">
      <div className="flex items-center gap-[9px] text-[15px] font-medium">
        <IconGitBranch size={19} className="text-accent" stroke={1.75} />
      </div>
    </header>
  );
}
