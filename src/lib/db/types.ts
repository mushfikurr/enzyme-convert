export interface FileRecord {
  id?: number;
  name: string;
  size: number;
  type: string;
  status: "pending" | "completed" | "failed" | "not started" | "in progress";
  progress: number;
  createdAt: Date;
  convertedName?: string | null;
  convertedType?: string | null;
  fileData: ArrayBuffer;
}
