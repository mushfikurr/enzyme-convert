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
  const { setLog } = useFfmpegCtx();

  const handleClearLogs = () => {
    setLog([]);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon" variant="ghost">
          <SquareTerminal className="h-7 w-7" strokeWidth={2.5} />
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
            <div className="flex gap-2 items-center">
              <Button
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
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
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
