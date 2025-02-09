import db from "../db";
import { FileRecord } from "../types";

export const queries = {
  getFileFromDexie: async (fileId: number): Promise<File> => {
    const fileRecord = await db.files.get(fileId);

    if (!fileRecord) {
      throw new Error("File not found in the database.");
    }

    const { name, type } = fileRecord;

    const blob = new Blob([fileRecord.fileData], { type });

    const file = new File([blob], name, { type, lastModified: Date.now() });

    return file;
  },
  getFiles: async (): Promise<FileRecord[]> => {
    return await db.files.toArray();
  },
};
