import { cn } from "@/lib/utils";
import { SquareTerminal } from "lucide-react";
import { Button } from "./ui/button";

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
            "h-2 w-2 rounded-full mt-[3.5px] transition-colors ease-in-out duration-300",
            loaded
              ? "bg-green-500 shadow-[0px_0px_10px_0px_rgba(34,197,94,1)]"
              : "bg-muted animate-pulse duration-750"
          )}
          title={titleMsg}
        ></div>
      </div>

      <Button size="icon" variant="ghost">
        <SquareTerminal className="h-7 w-7" strokeWidth={2.5} />
      </Button>
    </div>
  );
}
