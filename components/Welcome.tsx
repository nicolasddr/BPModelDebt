import type { ReactNode } from "react";
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
    <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(60%_42%_at_50%_32%,rgba(24,95,165,0.06),transparent_70%)]"
      />

      <div className="flex w-full max-w-[600px] flex-col items-center">
        <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-[18px] border border-border bg-s2 text-accent shadow-[0_10px_30px_-12px_rgba(26,25,21,0.18),0_2px_8px_rgba(26,25,21,0.05)]">
          <IconGitBranch size={28} stroke={1.75} />
        </div>

        <h1 className="max-w-[19ch] text-balance text-[clamp(2rem,1.2rem+2.4vw,3rem)] font-bold leading-[1.08] tracking-[-0.022em]">
          Identificador de dívidas em modelos de processos de negócio
        </h1>

        <p className="mt-5 max-w-[46ch] text-[15px] leading-[1.62] text-ink-2">
          Envie um modelo BPMN e a ferramenta o analisa com apoio de IA,
          apontando anti-padrões de modelagem e dívidas técnicas, cada
          ocorrência com descrição e recomendação de correção.
        </p>

        <Button
          href="/analise"
          size="lg"
          className="mt-9 shadow-[0_12px_26px_-10px_rgba(24,95,165,0.45)]"
        >
          Iniciar
          <IconArrowRight size={18} stroke={1.75} />
        </Button>

        <div className="mt-14 grid w-full grid-cols-1 gap-y-7 border-t border-border pt-8 sm:grid-cols-2 sm:gap-x-9 sm:gap-y-0">
          <Concept
            icon={<IconLayoutGrid size={16} stroke={1.75} />}
            iconClassName="bg-run-bg text-run"
            title="Anti-padrões"
            catalog={<AntipatternCatalog />}
          >
            Erros recorrentes na estrutura do modelo, como um processo sem
            evento de fim ou um fluxo cruzando a fronteira de uma piscina.
          </Concept>

          <Concept
            className="border-t border-border pt-7 sm:border-t-0 sm:border-l sm:pt-0"
            icon={<IconStack2 size={16} stroke={1.75} />}
            iconClassName="bg-amber-bg text-amber"
            title="Dívidas técnicas"
            catalog={<TechDebtCatalog />}
          >
            Escolhas de modelagem que funcionam, mas comprometem a qualidade e a
            manutenção a longo prazo, como uma tarefa que deveria ser um
            subprocesso ou a falta de tratamento de exceções.
          </Concept>
        </div>
      </div>
    </div>
  );
}

function Concept({
  icon,
  iconClassName,
  title,
  catalog,
  className,
  children,
}: {
  icon: ReactNode;
  iconClassName: string;
  title: string;
  catalog: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col items-center px-1 ${className ?? ""}`.trim()}
    >
      <span
        className={`mb-2.5 flex h-8 w-8 items-center justify-center rounded-[9px] ${iconClassName}`}
      >
        {icon}
      </span>
      <div className="mb-1.5 flex items-center gap-1.5">
        <h2 className="text-[13px] font-medium">{title}</h2>
        {catalog}
      </div>
      <p className="max-w-[32ch] text-[13px] leading-[1.55] text-ink-3">
        {children}
      </p>
    </div>
  );
}
