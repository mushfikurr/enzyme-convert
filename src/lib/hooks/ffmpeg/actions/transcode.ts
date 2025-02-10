import { mutations } from "@/lib/db/actions/mutations";
import { getFileFromFileRecord } from "@/lib/db/actions/util";
import { FileRecord } from "@/lib/db/types";
import { schema } from "@/lib/schema/conversion-types";
import { downloadFileData } from "@/lib/utils";
import { fetchFile } from "@ffmpeg/util";
import { toast } from "sonner";
import { FFmpegRefType } from "../useFfmpeg";
import mime from "mime";

const getFileNameWithoutExtension = (file: File) => {
  const name = file.name;
  const lastDotIndex = name.lastIndexOf(".");

  return lastDotIndex === -1 ? name : name.substring(0, lastDotIndex);
};

// TODO: Make a wrapper function for actions to use:
// Should handle reading files, writing files and deleting temporary files after conversion
// An action function should only do the processing.

export const transcode = async (
  fileRecord: FileRecord,
  targetExtension: string,
  ffmpegRef: FFmpegRefType
) => {
  const ffmpeg = ffmpegRef.current;
  const sourceFile = getFileFromFileRecord(fileRecord);
  const sourceFileName = sourceFile.name;
  const targetFileName =
    getFileNameWithoutExtension(sourceFile) + targetExtension;
  console.log("Target extension: ", targetExtension);

  try {
    if (!schema.sourceFile.safeParse(sourceFile).success) {
      throw new Error("Invalid source file format");
    }

    try {
      console.log("Writing file", sourceFileName);
      ffmpeg
        .writeFile(sourceFileName, await fetchFile(sourceFile))
        .then((success) => {
          if (success)
            mutations.updateFileInfo(fileRecord.id!, {
              progress: 0,
              status: "in progress",
            });
        });
    } catch (e: any) {
      toast.error("Error writing to file", { description: e });
      console.error(e);
      return;
    }

    try {
      console.log("Executing transcode", sourceFileName, targetFileName);
      await ffmpeg.exec(["-i", sourceFileName, targetFileName]);
    } catch (e: any) {
      toast.error("Error during conversion", { description: e });
      console.error(e);
      return;
    }

    let fileData;
    try {
      console.log("Reading file", targetFileName);
      fileData = await ffmpeg.readFile(targetFileName);
    } catch (e: any) {
      toast.error("Error reading file", { description: e });
      console.error(e);
      return;
    }

    try {
      await downloadFileData(fileData, targetFileName);
      mutations.updateFileInfo(fileRecord.id!, {
        progress: 100,
        status: "completed",
        convertedName: targetFileName,
        convertedType: mime.getType(targetFileName),
      });
    } catch (e: any) {
      toast.error("Error downloading file", { description: e });
      console.error(e);
      return;
    }

    try {
      await ffmpeg.deleteFile(sourceFileName);
      await ffmpeg.deleteFile(targetFileName);
    } catch (e: any) {
      toast.error("Error cleaning up files after conversion", {
        description: e,
      });
      console.error(e);
      return;
    }
  } catch (e: any) {
    toast.error("An unexpected error occurred", { description: e });
    console.error(e);
  }
};
