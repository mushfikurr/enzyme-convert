import db from "@/lib/db/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileCard } from "./file-card";
import { ProcessingDescription } from "./processing-description";
import { ProcessingFooter } from "./processing-footer";
import { queries } from "@/lib/db/actions/queries";

export default function Processing() {
  const fileRecords = useLiveQuery(() => queries.getFilesRecordsDescending());

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>all files</CardTitle>
        <ProcessingDescription fileRecords={fileRecords} />
      </CardHeader>
      {fileRecords && fileRecords.length > 0 && (
        <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
          {fileRecords.map((fileRecord) => (
            <FileCard key={fileRecord.id} {...fileRecord} />
          ))}
        </CardContent>
      )}
      <ProcessingFooter fileRecords={fileRecords} />
    </Card>
  );
}
