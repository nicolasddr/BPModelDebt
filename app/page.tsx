import { FindingsList } from "@/components/FindingsList";
import { ModelHeader } from "@/components/ModelHeader";
import { Topbar } from "@/components/Topbar";
import { mockFindings } from "@/mock/findings";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="mx-auto w-full max-w-[760px] px-[22px] pt-7 pb-[60px]">
        <ModelHeader
          meta={{
            filename: "processo_credito.bpmn",
            atividades: 24,
            gateways: 6,
            pools: 3,
          }}
        />
        <FindingsList findings={mockFindings} />
      </div>
    </>
  );
}
