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

type ConvertCardProps = {
  handleTranscode: (file: File, targetExtension: string) => void;
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleTranscode(acceptedFiles[0], targetExtension);
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
          disabled={!acceptedFiles.length}
          onClick={handleClick}
          loading={loading}
        >
          convert anything
        </Button>
      </CardFooter>
    </Card>
  );
}
