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

export default function ConvertCard() {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useConvertDropzone();

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
        >
          convert anything
        </Button>
      </CardFooter>
    </Card>
  );
}
