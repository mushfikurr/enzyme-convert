import { FFmpeg } from "@ffmpeg/ffmpeg";

export const transcode = (ffmpeg: FFmpeg) => {
  return async (sourceFileName: string, targetFileName: string) => {
    await ffmpeg.exec(["-i", sourceFileName, targetFileName]);
  };
};
