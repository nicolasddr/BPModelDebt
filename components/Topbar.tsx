import { IconGitBranch } from "@tabler/icons-react";
import Link from "next/link";

export function Topbar() {
  return (
    <header className="sticky top-0 z-[2] flex items-center justify-between border-b border-border bg-s0 px-[22px] py-[14px]">
      <Link
        href="/"
        aria-label="Voltar à página inicial"
        className="flex cursor-pointer items-center gap-[9px] rounded text-[15px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <IconGitBranch size={19} className="text-accent" stroke={1.75} />
        <span>BPModelDebt</span>
      </Link>
    </header>
  );
}
