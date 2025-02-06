import { cn } from "@/lib/utils";
import { ArrowLeftRight } from "lucide-react";

export function Header({ loaded }: { loaded: boolean }) {
  const titleMsg = loaded ? "ffmpeg loaded" : "waiting for ffmpeg";
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl">
          <span className="text-muted-foreground">{">"}</span> enzyme
        </h1>
        <div
          className={cn(
            "h-2 w-2 rounded-full mt-[4px]",
            loaded
              ? "bg-green-500 shadow-[0px_0px_10px_0px_rgba(34,197,94,1)]"
              : "bg-muted"
          )}
          title={titleMsg}
        ></div>
      </div>

      <ArrowLeftRight />
    </div>
  );
}
