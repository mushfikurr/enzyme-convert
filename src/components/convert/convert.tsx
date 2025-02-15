import { useConvertDropzone } from "@/lib/useDropzone";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FileRecord } from "@/lib/db/types";
import { queries } from "@/lib/db/actions/queries";
import { useSearch } from "@tanstack/react-router";

type ConvertCardProps = {
  handleTranscode: (files: FileRecord[], targetExtension: string) => void;
  targetExtension: string;
  loading: boolean;
};

export default function ConvertCard({
  handleTranscode,
  targetExtension,
  loading,
}: ConvertCardProps) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useConvertDropzone();
  const searchParams = useSearch({ from: "__root__" });

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const fileRecords = await queries.getFileRecordsPending();
    if (fileRecords) {
      console.log("called");
      handleTranscode(fileRecords, targetExtension);
    }
  };

  return (
    <Card
      className={cn(
        "w-full transition-all duration-300 ease-in-out",
        isDragActive && "scale-105 border-primary"
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <CardHeader>
        <CardTitle>convert files</CardTitle>
        <CardDescription>
          drag and drop, tap, or paste to convert locally
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button
          size="sm"
          className="font-bold"
          disabled={
            !acceptedFiles.length ||
            searchParams.source === "" ||
            searchParams.target === ""
          }
          onClick={handleClick}
          loading={loading}
        >
          convert
        </Button>
      </CardFooter>
    </Card>
  );
}
