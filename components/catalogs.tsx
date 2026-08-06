import { CatalogInfo } from "@/components/CatalogInfo";
import { ANTIPATTERNS, TECH_DEBTS } from "@/lib/catalog";

export function AntipatternCatalog() {
  return (
    <CatalogInfo title="Anti-padrões considerados">
      <ul className="space-y-2 text-[13px] text-ink-2">
        {ANTIPATTERNS.map((ap) => (
          <li key={ap.code} className="flex gap-2">
            <span className="shrink-0 pt-px font-mono text-[11px] text-ink-3">
              {ap.code}
            </span>
            <span>{ap.text}</span>
          </li>
        ))}
      </ul>
    </CatalogInfo>
  );
}

export function TechDebtCatalog() {
  return (
    <CatalogInfo title="Dívidas técnicas consideradas">
      <div className="space-y-3.5">
        {TECH_DEBTS.map((group) => (
          <div key={group.label}>
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-3">
              {group.label}
            </p>
            <ul className="space-y-2 text-[13px] text-ink-2">
              {group.items.map((item) => (
                <li key={item.code} className="flex gap-2">
                  <span className="shrink-0 pt-px font-mono text-[11px] text-ink-3">
                    {item.code}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </CatalogInfo>
  );
}
