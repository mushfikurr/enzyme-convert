import { FileRecord } from "../types";

export function getFileFromFileRecord(fileRecord: FileRecord): File {
  const blob = new Blob([fileRecord.fileData], { type: fileRecord.type });

  const file = new File([blob], fileRecord.name, {
    type: fileRecord.type,
    lastModified: Date.now(),
  });

  return file;
}
