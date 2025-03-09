import { getFileFromFileRecord } from "@/lib/db/actions/util";
import { downloadFileData } from "@/lib/utils";
import { FileRecord } from "@/lib/db/types";
import { mutations } from "@/lib/db/actions/mutations";
import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { handleAction } from "./handle-action";

export const processWithFFmpeg = async (
  fileRecord: FileRecord,
  ffmpeg: FFmpeg,
  ffmpegCommand: (
    sourceFileName: string,
    targetFileName: string
  ) => Promise<void>,
  targetExtension: string
) => {
  const sourceFile = await getFileFromFileRecord(fileRecord);
  const sourceFileName = sourceFile.name;
  const targetFileName = sourceFileName.replace(/\.[^/.]+$/, targetExtension);

  try {
    await ffmpeg.writeFile(sourceFileName, await fetchFile(sourceFile));
    await ffmpegCommand(sourceFileName, targetFileName);

    const fileData = await ffmpeg.readFile(targetFileName);

    await downloadFileData(fileData, targetFileName);
    await mutations.updateFileRecordInfo(fileRecord.id!, {
      progress: 100,
      status: "completed",
      convertedName: targetFileName,
      convertedType: targetExtension,
    });

    return fileData;
  } finally {
    await ffmpeg.deleteFile(sourceFileName).catch(console.error);
    await ffmpeg.deleteFile(targetFileName).catch(console.error);
  }
};

export const handleFFmpegAction = async (
  files: FileRecord[],
  ffmpeg: FFmpeg,
  ffmpegCommand: (
    sourceFileName: string,
    targetFileName: string
  ) => Promise<void>,
  targetExtension: string,
  setProcessing: (processing: boolean) => void
) => {
  return await Promise.all(
    files.map(async (fileRecord) => {
      await handleAction(
        processWithFFmpeg,
        fileRecord.id!,
        fileRecord,
        ffmpeg,
        ffmpegCommand,
        targetExtension
      );
    })
  ).finally(() => setProcessing(false));
};
