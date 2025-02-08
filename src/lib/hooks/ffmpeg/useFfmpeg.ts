import { FFMessageLoadConfig, FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";
import { canSharedArrayBuffersRun } from "./can-shared-array-buffers-run";

export type FFmpegRefType = React.RefObject<FFmpeg>;

export function useFfmpeg() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [status, setStatus] = useState<string>();
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
    const canMultithread = canSharedArrayBuffersRun();
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
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (ffmpegRef.current) {
      load();
    }
  }, [ffmpegRef]);

  return { loaded, status };
}
