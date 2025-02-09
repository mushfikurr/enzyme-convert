// db.ts
import Dexie, { Table } from "dexie";
import { FileRecord } from "./types";

class MyDatabase extends Dexie {
  files!: Table<FileRecord>;

  constructor() {
    super("enzymeDb");
    this.version(1).stores({
      files:
        "++id, name, size, type, status, progress, createdAt, convertedName, convertedType, conversionStatus, fileData",
    });
  }
}

const db = new MyDatabase();
export default db;
