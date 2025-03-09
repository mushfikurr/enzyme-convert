import { createContext, useContext } from "react";
import { useFfmpeg, UseFfmpegReturnType } from "../hooks/ffmpeg/useFfmpeg";

const FfmpegContext = createContext<UseFfmpegReturnType | null>(null);

export const useFfmpegCtx = () => {
  const context = useContext(FfmpegContext);
  if (!context)
    throw new Error("useFfmpegCtx must be used within FfmpegProvider");
  return context;
};

export function FfmpegProvider({ children }: { children: React.ReactNode }) {
  const ffmpeg = useFfmpeg();

  return (
    <FfmpegContext.Provider value={ffmpeg}>{children}</FfmpegContext.Provider>
  );
}
