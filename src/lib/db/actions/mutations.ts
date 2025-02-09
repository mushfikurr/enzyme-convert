import db from "../db";

export const mutations = {
  addFile: async (file: File) => {
    const fileData = await file.arrayBuffer();
    return await db.files.add({
      name: file.name,
      size: file.size,
      type: file.type,
      status: "pending",
      progress: 0,
      createdAt: new Date(),
      convertedName: null,
      convertedType: null,
      conversionStatus: "not started",
      fileData: fileData,
    });
  },
  updateConversionInfo: async (
    fileId: number,
    convertedName: string | null,
    convertedType: string | null,
    conversionStatus: "not started" | "in progress" | "completed" | "failed",
    progress: number
  ) => {
    await db.files.update(fileId, {
      convertedName,
      convertedType,
      conversionStatus,
      progress,
    });
  },
  updateFileStatus: async (
    fileId: number,
    status: "pending" | "completed" | "failed"
  ) => {
    await db.files.update(fileId, { status });
  },
};
