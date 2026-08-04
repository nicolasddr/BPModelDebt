import {
  IconArrowRight,
  IconGitBranch,
  IconLayoutGrid,
  IconStack2,
} from "@tabler/icons-react";
import { Button } from "@/components/Button";
import { AntipatternCatalog, TechDebtCatalog } from "@/components/catalogs";

export function Welcome() {
  return (
    <div className="mx-auto mt-10 max-w-[560px] text-center">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-s2 text-accent">
        <IconGitBranch size={24} stroke={1.75} />
      </div>

      <h1 className="text-[22px] font-medium leading-snug">
        Identificador de dívidas em modelos de processos de negócio
      </h1>
      <p className="mx-auto mt-3 max-w-[480px] text-[14px] text-ink-2">
        Envie um modelo BPMN e a ferramenta o analisa com apoio de IA, apontando anti-padrões de modelagem e dívidas
        técnicas, cada ocorrência com descrição e recomendação de correção.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-s2 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-run-bg text-run">
              <IconLayoutGrid size={16} stroke={1.75} />
            </span>
            <span className="text-[13px] font-medium">Anti-padrões</span>
            <AntipatternCatalog />
          </div>
          <p className="text-[13px] text-ink-2">
            Erros recorrentes na estrutura do modelo, como um processo sem
            evento de fim ou um fluxo cruzando a fronteira de uma piscina.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-s2 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-amber-bg text-amber">
              <IconStack2 size={16} stroke={1.75} />
            </span>
            <span className="text-[13px] font-medium">Dívidas técnicas</span>
            <TechDebtCatalog />
          </div>
          <p className="text-[13px] text-ink-2">
            Escolhas de modelagem que funcionam, mas comprometem a qualidade e a
            manutenção a longo prazo, como uma tarefa que deveria ser um
            subprocesso ou a falta de tratamento de exceções.
          </p>
        </div>
      </div>

      <Button href="/analise" size="md" className="mt-8">
        Iniciar
        <IconArrowRight size={17} stroke={1.75} />
      </Button>
    </div>
  );
}
