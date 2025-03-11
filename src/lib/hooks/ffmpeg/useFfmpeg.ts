import { FileRecord } from "@/lib/db/types";
import { FFMessageLoadConfig, FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { transcode } from "./actions/transcode";
import { canSharedArrayBuffersRun } from "./can-shared-array-buffers-run";
import { queries } from "@/lib/db/actions/queries";
import { mutations } from "@/lib/db/actions/mutations";
import { processAllFilesWithFfmpeg } from "./util/process-with-ffmpeg";

export type FFmpegRefType = React.RefObject<FFmpeg>;

export function useFfmpeg() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([]);
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const canMultithread = canSharedArrayBuffersRun();
    const baseURL = canMultithread
      ? "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm"
      : "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      setLog((prev) => [...prev, message]);
    });

    ffmpeg.on("progress", async ({ progress, time }) => {
      const fileRecord = await queries.getLatestInProgressFileRecord();
      if (fileRecord) {
        console.log("progress", progress);
        mutations.updateFileRecordProgress(fileRecord.id!, progress);
      }
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

  const actions = {
    handleTranscode: async (files: FileRecord[], targetExtension: string) =>
      await processAllFilesWithFfmpeg(
        files,
        ffmpegRef.current,
        transcode(ffmpegRef.current),
        targetExtension,
        setProcessing
      ),
  };

  return { ...actions, processing, loaded, log, setLog };
}

export type UseFfmpegReturnType = ReturnType<typeof useFfmpeg>;
