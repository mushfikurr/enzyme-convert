import { FileRecord } from "@/lib/db/types";
import { CardDescription } from "../ui/card";
import { useLiveQuery } from "dexie-react-hooks";
import { queries } from "@/lib/db/actions/queries";

export function ProcessingDescription({
  fileRecords,
}: {
  fileRecords?: FileRecord[];
}) {
  const processingFileRecords = useLiveQuery(() =>
    queries.getLatestInProgressFileRecord()
  );
  if (fileRecords?.length === 0) {
    return (
      <CardDescription>files that you process will appear here</CardDescription>
    );
  }
  if (processingFileRecords) {
    return (
      <CardDescription>processing {processingFileRecords.name}</CardDescription>
    );
  }
  if (fileRecords) return null;
}
