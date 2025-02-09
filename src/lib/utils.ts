import { FileData } from "@ffmpeg/ffmpeg";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import mime from "mime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function downloadFileData(
  fileData: FileData,
  targetFileName: string
) {
  const data = new Uint8Array(fileData as ArrayBuffer);
  const type = mime.getType(targetFileName);

  if (!type) {
    throw new Error("Invalid file type");
  }

  const blob = new Blob([data.buffer], { type });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = targetFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
