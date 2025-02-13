import { FileRecord } from "@/lib/db/types";
import { FFMessageLoadConfig, FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { transcode } from "./actions/transcode";
import { canSharedArrayBuffersRun } from "./can-shared-array-buffers-run";

export type FFmpegRefType = React.RefObject<FFmpeg>;

export function useFfmpeg() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [status, setStatus] = useState<string>();
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const canMultithread = canSharedArrayBuffersRun();
    const baseURL = canMultithread
      ? "https://unpkg.com/@ffmpeg/core-mt@0.12.10/dist/esm"
      : "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      setStatus(message);
      console.log(message);
    });

    const loadOptions: FFMessageLoadConfig = {
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
      workerURL: canMultithread
        ? await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, "text/javascript")
        : undefined,
    };

    try {
      await ffmpeg.load(loadOptions);
      setLoaded(true);
    } catch (e: any) {
      toast.error("Failed to load ffmpeg", { description: e.message });
      console.error(e);
    }
  };

  useEffect(() => {
    if (ffmpegRef.current) {
      load();
    }
  }, [ffmpegRef]);

  const handleAction = async <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    ...args: Parameters<T>
  ) => {
    setProcessing(true);
    try {
      await fn(...args);
    } finally {
      setProcessing(false);
    }
  };

  const actions = {
    handleTranscode: async (file: FileRecord, targetExtension: string) =>
      await handleAction(transcode, file, targetExtension, ffmpegRef),
  };

  return { ...actions, processing, loaded, status };
}
