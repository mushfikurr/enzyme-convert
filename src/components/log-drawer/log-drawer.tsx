import { SquareTerminal } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useFfmpegCtx } from "@/lib/context/ffmpeg-context";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent } from "../ui/card";

export default function LogDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline">
          <SquareTerminal className="h-9 w-9" strokeWidth={2} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>ffmpeg log</DrawerTitle>
            <DrawerDescription>
              these are the logs from the ffmpeg.wasm instance.
            </DrawerDescription>
          </DrawerHeader>
          <Logs />
          <DrawerFooter>
            <DrawerActions />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function DrawerActions() {
  const { log, setLog } = useFfmpegCtx();

  const handleClearLogs = () => {
    setLog([]);
  };

  return (
    <div className="flex gap-2 items-center">
      <Button
        disabled={log.length === 0}
        variant="outline"
        onClick={handleClearLogs}
        className="w-full"
      >
        clear
      </Button>
      <DrawerClose asChild>
        <Button variant="outline" className="w-full">
          exit
        </Button>
      </DrawerClose>
    </div>
  );
}

function Logs() {
  const { log } = useFfmpegCtx();

  if (log.length)
    return (
      <div className="p-4 pb-0">
        <Card>
          <CardContent className="h-full space-y-3 pt-6">
            <ScrollArea
              onPointerDown={(e) => e.stopPropagation()}
              className="h-64 overflow-hidden"
            >
              <div className="space-y-3">
                {log.map((line) => (
                  <p className="tracking-wide">{line}</p>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="p-4 pb-0 h-64">
      <Card className="h-full text-muted-foreground">
        <CardContent className="flex items-center justify-center h-full">
          <p className="text-center text-sm">no logs</p>
        </CardContent>
      </Card>
    </div>
  );
}
