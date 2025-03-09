import { FFmpeg } from "@ffmpeg/ffmpeg";

export const checkStreams = (ffmpeg: FFmpeg) => {
  return async (sourceFileName: string) => {
    await ffmpeg.ffprobe([
      "-v",
      "error",
      "-show_streams",
      "-of",
      "json",
      sourceFileName,
      "-o",
      "output.json",
    ]);
  };
};
