import { useFfmpegCtx } from "@/lib/context/ffmpeg-context";
import { queries } from "@/lib/db/actions/queries";
import { useConvertDropzone } from "@/lib/hooks/useDropzone";
import { cn } from "@/lib/utils";
import { useSearch } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type ConvertCardProps = {
  targetExtension: string;
};

export default function ConvertCard({ targetExtension }: ConvertCardProps) {
  const { handleTranscode, processing: loading } = useFfmpegCtx();
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
