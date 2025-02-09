export interface FileRecord {
  id?: number;
  name: string;
  size: number;
  type: string;
  status: "pending" | "completed" | "failed";
  progress: number;
  createdAt: Date;
  convertedName?: string | null;
  convertedType?: string | null;
  conversionStatus: "not started" | "in progress" | "completed" | "failed";
  fileData: ArrayBuffer;
}
