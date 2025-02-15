import db from "../db";
import { FileRecord, Status } from "../types";

type UpdateFileInfoParams = Pick<
  FileRecord,
  "convertedName" | "convertedType" | "status" | "progress"
>;

export const mutations = {
  addFileRecord: async (file: File) => {
    try {
      const fileData = await file.arrayBuffer();
      const id = await db.files.add({
        name: file.name,
        size: file.size,
        type: file.type,
        status: "pending",
        progress: 0,
        createdAt: new Date(),
        convertedName: null,
        convertedType: null,
        fileData: fileData,
      });
      return id;
    } catch (error) {
      console.error("Error adding file:", error);
      throw new Error("Failed to add file");
    }
  },

  removeFileRecord: async (fileId: number) => {
    try {
      await db.files.delete(fileId);
    } catch (error) {
      console.error("Error removing file:", error);
      throw new Error("Failed to remove file");
    }
  },

  removeAllCompletedFileRecords: async () => {
    try {
      const processedFileRecords = await db.files
        .where("status")
        .equals("completed")
        .toArray();
      await db.files.bulkDelete(processedFileRecords.map((file) => file.id));
    } catch (error) {
      console.error("Error removing completed files:", error);
      throw new Error("Failed to remove completed files");
    }
  },

  removeAllFileRecords: async () => {
    try {
      const fileRecords = await db.files.toArray();
      await db.files.bulkDelete(fileRecords.map((file) => file.id));
    } catch (error) {
      console.error("Error removing all files:", error);
      throw new Error("Failed to remove all files");
    }
  },

  updateFileRecordInfo: async (
    fileId: number,
    params: UpdateFileInfoParams
  ) => {
    try {
      const updated = await db.files.update(fileId, {
        ...params,
      });
      if (!updated) {
        throw new Error("File not found or update failed");
      }
    } catch (error) {
      console.error("Error updating file info:", error);
      throw new Error("Failed to update file info");
    }
  },

  updateFileRecordStatus: async (fileId: number, status: Status) => {
    try {
      await db.files.update(fileId, { status });
    } catch (error) {
      console.error("Error updating file status:", error);
      throw new Error("Failed to update file status");
    }
  },

  updateFileRecordProgress: async (fileId: number, progress: number) => {
    try {
      await db.files.update(fileId, { progress });
    } catch (error) {
      console.error("Error updating file progress:", error);
      throw new Error("Failed to update file progress");
    }
  },
};
