"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { IconHelp } from "@tabler/icons-react";

const PANEL_WIDTH = 320;
const CLOSE_DELAY = 120;

export function CatalogInfo({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function scheduleHide() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  }

  useEffect(() => {
    if (!open) return;

    function place() {
      const button = buttonRef.current;
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const margin = 16;
      const maxLeft = window.innerWidth - margin - PANEL_WIDTH;
      const left = Math.max(
        margin,
        Math.min(rect.left + rect.width / 2 - PANEL_WIDTH / 2, maxLeft),
      );
      setPos({ top: rect.bottom + 8, left });
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    document.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Catálogo de ${title}`}
        aria-expanded={open}
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
        onFocus={show}
        onBlur={scheduleHide}
        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
          open ? "text-accent" : "text-ink-3 hover:text-ink-2"
        }`}
      >
        <IconHelp size={16} stroke={1.75} />
      </button>

      {open &&
        pos &&
        createPortal(
          <div
            ref={panelRef}
            role="dialog"
            aria-label={title}
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
            style={{ position: "fixed", top: pos.top, left: pos.left, width: PANEL_WIDTH }}
            className="z-50 max-w-[calc(100vw-2rem)] rounded-[10px] border border-border bg-s2 p-4 shadow-lg"
          >
            <p className="mb-3 text-[13px] font-medium">{title}</p>
            <div className="max-h-[300px] overflow-y-auto pr-1">{children}</div>
          </div>,
          document.body,
        )}
    </>
  );
}
