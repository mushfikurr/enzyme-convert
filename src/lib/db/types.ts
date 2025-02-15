export type Status =
  | "pending"
  | "completed"
  | "failed"
  | "not started"
  | "in progress";

export interface FileRecord {
  id?: number;
  name: string;
  size: number;
  type: string;
  status: Status;
  progress: number;
  createdAt: Date;
  convertedName?: string | null;
  convertedType?: string | null;
  fileData: ArrayBuffer;
}
