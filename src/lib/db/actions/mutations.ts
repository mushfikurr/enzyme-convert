import db from "../db";
import { FileRecord } from "../types";

type UpdateFileInfoParams = Pick<
  FileRecord,
  "convertedName" | "convertedType" | "status" | "progress"
>;

export const mutations = {
  addFile: async (file: File) => {
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

  updateFileInfo: async (fileId: number, params: UpdateFileInfoParams) => {
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
};
