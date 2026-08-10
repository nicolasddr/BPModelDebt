export function Citation({
  short,
  full,
  className,
}: {
  short: string;
  full: string;
  className?: string;
}) {
  return (
    <span className={`group relative inline-block leading-none ${className ?? ""}`}>
      <span
        tabIndex={0}
        className="cursor-help underline decoration-dotted underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {short}
      </span>
      <span className="pointer-events-none invisible absolute bottom-full left-1/2 z-10 w-[min(420px,80vw)] -translate-x-1/2 pb-1 opacity-0 transition-opacity group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:opacity-100">
        <span className="block rounded-[10px] border border-border bg-s2 p-3 text-left text-xs leading-relaxed text-ink-2 shadow-lg">
          <cite className="not-italic">{full}</cite>
        </span>
      </span>
    </span>
  );
}
