import { mutations } from "@/lib/db/actions/mutations";
import { FileRecord } from "@/lib/db/types";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

export function ProcessingFooter({
  fileRecords,
}: {
  fileRecords?: FileRecord[];
}) {
  if (fileRecords && fileRecords.length > 0) {
    return (
      <CardFooter className="flex justify-end items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={mutations.removeAllFileRecords}
        >
          clear all
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={mutations.removeAllCompletedFileRecords}
        >
          clear completed
        </Button>
      </CardFooter>
    );
  }
}
