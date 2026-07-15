import { FindingCard } from "@/components/FindingCard";
import { WaitingPlaceholder } from "@/components/WaitingPlaceholder";
import type { Finding } from "@/lib/schema";

export function FindingsList({ findings }: { findings: Finding[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[15px] font-medium">Ocorrências</span>
        <span className="text-xs text-ink-3">{findings.length} encontradas</span>
      </div>
      {findings.map((finding) => (
        <FindingCard key={finding.bpmn_element.id} finding={finding} />
      ))}
      <WaitingPlaceholder>Aguardando conclusão do estágio 2...</WaitingPlaceholder>
    </div>
  );
}
