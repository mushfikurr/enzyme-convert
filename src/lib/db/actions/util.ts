import { FileRecord } from "../types";

export async function getFileFromFileRecord(fileRecord: FileRecord): Promise<File> {
  try {
    // Fetch the file using the stored filePath URL
    const response = await fetch(fileRecord.filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch file from ${fileRecord.filePath}`);
    }
    
    const blob = await response.blob();
    const file = new File([blob], fileRecord.name, {
      type: fileRecord.type,
      lastModified: Date.now(),
    });

    return file;
  } catch (error) {
    console.error("Error retrieving file from filePath:", error);
    throw new Error("Failed to retrieve file from the stored path.");
  }
}
