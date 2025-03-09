import db from "../db";
import { FileRecord } from "../types";

export const queries = {
  getFileRecord: async (fileId: number): Promise<File> => {
    try {
      const fileRecord = await db.files.get(fileId);

      if (!fileRecord) {
        throw new Error("File not found in the database.");
      }

      const response = await fetch(fileRecord.filePath);
      if (!response.ok) {
        throw new Error("Failed to fetch the file from the stored path.");
      }

      const blob = await response.blob();
      const file = new File([blob], fileRecord.name, {
        type: fileRecord.type,
        lastModified: Date.now(),
      });

      return file;
    } catch (error) {
      console.error("Error retrieving file:", error);
      throw new Error("Failed to retrieve file from the database.");
    }
  },

  getFilesRecordsDescending: async (): Promise<FileRecord[]> => {
    try {
      const files = await db.files.orderBy("createdAt").reverse().toArray();
      return files;
    } catch (error) {
      console.error("Error retrieving files:", error);
      throw new Error("Failed to retrieve files from the database.");
    }
  },

  getFileRecordsPending: async (): Promise<FileRecord[]> => {
    try {
      const files = await db.files.where("status").equals("pending").toArray();
      return files;
    } catch (error) {
      console.error("Error retrieving files:", error);
      throw new Error("Failed to retrieve files from the database.");
    }
  },

  getFileRecords: async (): Promise<FileRecord[]> => {
    try {
      const files = await db.files.toArray();
      return files;
    } catch (error) {
      console.error("Error retrieving files:", error);
      throw new Error("Failed to retrieve files from the database.");
    }
  },

  getLatestFileRecord: async (): Promise<FileRecord | null> => {
    try {
      const files = await db.files.toArray();

      if (files.length === 0) {
        return null;
      }

      const latestFileRecord = files.toSorted((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })[0];

      return latestFileRecord;
    } catch (error) {
      console.error("Error retrieving the latest file:", error);
      throw new Error("Failed to retrieve the latest file from the database.");
    }
  },

  getLatestInProgressFileRecord: async (): Promise<FileRecord | null> => {
    try {
      const files = await db.files
        .where("status")
        .equals("in progress")
        .toArray();

      if (files.length === 0) {
        return null;
      }

      const latestFileRecord = files.toSorted((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })[0];

      return latestFileRecord;
    } catch (error) {
      console.error("Error retrieving the latest in-progress file:", error);
      throw new Error(
        "Failed to retrieve the latest in-progress file from the database."
      );
    }
  },
};
