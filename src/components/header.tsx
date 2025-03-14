import { cn } from "@/lib/utils";
import { SquareTerminal } from "lucide-react";
import { Button } from "./ui/button";
import { useFfmpegCtx } from "@/lib/context/ffmpeg-context";
import LogDrawer from "./log-drawer";

export function Header() {
  const { loaded } = useFfmpegCtx();
  const titleMsg = loaded ? "ffmpeg loaded" : "waiting for ffmpeg";
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-5">
        <h1 className="text-2xl font-bold flex items-center gap-3">enzyme</h1>
        <div
          className={cn(
            "h-2 w-2 rounded-full mt-0.5 transition-colors ease-in-out duration-300",
            loaded
              ? "bg-green-500 shadow-[0px_0px_10px_0px_rgba(34,197,94,1)]"
              : "bg-muted animate-pulse duration-750"
          )}
          title={titleMsg}
        ></div>
      </div>

      <LogDrawer />
    </div>
  );
}
