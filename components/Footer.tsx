import { Citation } from "@/components/Citation";
import {
  ANTIPATTERN_REFERENCE_FULL,
  ANTIPATTERN_REFERENCE_SHORT,
  TECHDEBT_REFERENCE_FULL,
  TECHDEBT_REFERENCE_SHORT,
} from "@/lib/reference";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border px-[22px] py-4">
      <div className="mx-auto w-full max-w-[760px] text-center text-xs leading-relaxed text-ink-3">
        <p>
          Catálogo de anti-padrões baseado em{" "}
          <Citation
            short={ANTIPATTERN_REFERENCE_SHORT}
            full={ANTIPATTERN_REFERENCE_FULL}
          />
        </p>
        <p>
          Catálogo de dívidas técnicas baseado em{" "}
          <Citation
            short={TECHDEBT_REFERENCE_SHORT}
            full={TECHDEBT_REFERENCE_FULL}
          />
        </p>
      </div>
    </footer>
  );
}
