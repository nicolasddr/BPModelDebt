import { Analyzer } from "@/components/Analyzer";
import { Topbar } from "@/components/Topbar";

export default function Home() {
  return (
    <>
      <Topbar />
      <main className="mx-auto w-full max-w-[760px] px-[22px] pt-7 pb-[60px]">
        <Analyzer />
      </main>
    </>
  );
}
