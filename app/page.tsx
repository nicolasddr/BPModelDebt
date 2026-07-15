import { IconFileExport } from "@tabler/icons-react";
import { FindingsList } from "@/components/FindingsList";
import { ModelHeader } from "@/components/ModelHeader";
import { PipelinePanel } from "@/components/PipelinePanel";
import { Topbar } from "@/components/Topbar";
import { mockFindings } from "@/mock/findings";

export default function Home() {
  return (
    <>
      <Topbar />
      <main className="mx-auto w-full max-w-[760px] px-[22px] pt-7 pb-[60px]">
        <ModelHeader
          meta={{
            filename: "processo_credito.bpmn",
            atividades: 24,
            gateways: 6,
            pools: 3,
          }}
        />
        <PipelinePanel />
        <FindingsList findings={mockFindings} />
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="inline-flex h-[34px] items-center gap-1.5 rounded border border-accent bg-accent px-3.5 text-[13px] text-white hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <IconFileExport size={16} stroke={1.75} />
            Exportar relatório
          </button>
        </div>
      </main>
    </>
  );
}
