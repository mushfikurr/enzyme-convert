import { schema } from "@/lib/schema/conversion-types";
import { downloadFileData } from "@/lib/utils";
import { fetchFile } from "@ffmpeg/util";
import { FFmpegRefType } from "../useFfmpeg";
import { toast } from "sonner";

const getFileNameWithoutExtension = (file: File) => {
  const name = file.name;
  const lastDotIndex = name.lastIndexOf(".");

  return lastDotIndex === -1 ? name : name.substring(0, lastDotIndex);
};

export const transcode = async (
  file: File,
  targetExtension: string,
  ffmpegRef: FFmpegRefType
) => {
  const ffmpeg = ffmpegRef.current;
  const sourceFileName = file.name;
  const targetFileName = getFileNameWithoutExtension(file) + targetExtension;

  try {
    if (!schema.sourceFile.safeParse(file).success) {
      throw new Error("Invalid source file format");
    }

    try {
      await ffmpeg.writeFile(sourceFileName, await fetchFile(file));
    } catch (e: any) {
      toast.error("Error writing to file", { description: e.message });
      console.error(e);
      return;
    }

    try {
      await ffmpeg.exec(["-i", sourceFileName, targetFileName]);
    } catch (e: any) {
      toast.error("Error during conversion", { description: e.message });
      console.error(e);
      return;
    }

    let fileData;
    try {
      fileData = await ffmpeg.readFile(targetFileName);
    } catch (e: any) {
      toast.error("Error reading file", { description: e.message });
      console.error(e);
      return;
    }

    try {
      await downloadFileData(fileData, targetFileName);
    } catch (e: any) {
      toast.error("Error downloading file", { description: e.message });
      console.error(e);
      return;
    }
  } catch (e: any) {
    toast.error("An unexpected error occurred", { description: e.message });
    console.error(e);
  }
};
