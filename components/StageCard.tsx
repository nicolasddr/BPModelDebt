import {
  IconAlertTriangle,
  IconCheck,
  IconCircleCheck,
  IconLoader2,
} from "@tabler/icons-react";

export type StageStatus =
  | { state: "ok"; count: number }
  | { state: "running" }
  | { state: "error"; message: string };

const TONE: Record<StageStatus["state"], string> = {
  ok: "bg-ok-bg text-ok",
  running: "bg-run-bg text-run",
  error: "bg-pink-bg text-pink",
};

export function StageCard({
  title,
  status,
}: {
  title: string;
  status: StageStatus;
}) {
  return (
    <div className="flex flex-1 gap-3 p-4">
      <div
        className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg ${TONE[status.state]}`}
      >
        {status.state === "ok" ? (
          <IconCheck size={16} stroke={1.75} />
        ) : status.state === "error" ? (
          <IconAlertTriangle size={16} stroke={1.75} />
        ) : (
          <IconLoader2 size={16} stroke={1.75} className="animate-spin" />
        )}
      </div>
      <div className="flex-1">
        <div className="text-[13px] font-medium">{title}</div>
        {status.state === "ok" && (
          <div className="mt-1.5 inline-flex items-center gap-1 text-xs text-ok">
            <IconCircleCheck size={14} stroke={1.75} />
            Concluído · {status.count}{" "}
            {status.count === 1 ? "ocorrência" : "ocorrências"}
          </div>
        )}
        {status.state === "error" && (
          <div className="mt-1.5 inline-flex items-start gap-1 text-xs text-pink">
            <IconAlertTriangle
              size={14}
              stroke={1.75}
              className="mt-px shrink-0"
            />
            {status.message}
          </div>
        )}
        {status.state === "running" && (
          <>
            <div className="mt-1.5 inline-flex items-center gap-1 text-xs text-run">
              <IconLoader2 size={14} stroke={1.75} className="animate-spin" />
              Analisando…
            </div>
            <div
              role="progressbar"
              aria-label={`${title} — analisando`}
              className="mt-2 h-1 overflow-hidden rounded-full bg-s1"
            >
              <span className="block h-full w-[30%] animate-indeterminate rounded-full bg-run" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
