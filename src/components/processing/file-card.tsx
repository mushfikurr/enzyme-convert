import { mutations } from "@/lib/db/actions/mutations";
import { FileRecord } from "@/lib/db/types";
import { cn } from "@/lib/utils";
import { File, Loader, X } from "lucide-react";
import { Button } from "../ui/button";

export function FileCard({ ...props }: FileRecord) {
  const { id, type, progress, status, convertedType, name } = props;
  const formattedPercentage = Number(progress).toFixed(0);
  const renderPercentage = status !== "pending" && `- ${formattedPercentage}%`;
  return (
    <div className={cn("rounded-md border p-4 space-y-3")}>
      <div className="flex items-center space-x-4">
        <File className="h-4 w-4" />
        <div className="flex-1 flex items-center">
          <div className="space-y-1 grow">
            <p className="text-sm font-medium leading-none max-w-[200px] truncate">
              {name}
            </p>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              {status === "in progress" && (
                <Loader className="animate-spin h-4 w-4" />
              )}
              <p className="text-sm text-muted-foreground">
                {status} {renderPercentage}
              </p>
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              onClick={() => {
                mutations.removeFileRecord(id!);
              }}
              variant="outline"
              size="icon"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      {convertedType && (
        <div className="text-xs font-medium text-muted-foreground flex gap-2 items-center">
          <p>{type}</p>
          <p>{"→"}</p>
          <p>{convertedType}</p>
        </div>
      )}
    </div>
  );
}
