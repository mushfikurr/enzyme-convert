import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { mutations } from "../db/actions/mutations";
import { schema } from "../schema/conversion-types";

export const useConvertDropzone = () => {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: "__root__" });

  const validator = (file: File) => {
    const parsed = schema.sourceFile.safeParse(file);
    if (!parsed.success) {
      return { message: parsed.error.message, code: "test" } as FileError;
    }

    return null;
  };

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const sourceWithExtension = "." + file.type.split("/")[1];
      navigate({
        to: ".",
        search: { ...searchParams, source: sourceWithExtension },
      });

      mutations.addFile(file);
      toast.success(`${file.name} is ready for conversion.`);
    });
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    fileRejections.forEach((fileRejection) => {
      if (fileRejection.errors && Array.isArray(fileRejection.errors)) {
        const errors = buildErrorString(fileRejection);
        toast.error(`Unable to process ${fileRejection.file.name}`, {
          description: errors,
        });
      }
    });
  }, []);

  return useDropzone({ validator: validator, onDropAccepted, onDropRejected });
};

const buildErrorString = (fileRejection: FileRejection) => {
  const errorMessages = fileRejection.errors.map((error: any) => {
    let message;
    try {
      const parsedMessage = JSON.parse(error.message);
      message =
        Array.isArray(parsedMessage) && parsedMessage.length > 0
          ? parsedMessage[0].message
          : "Unknown error";
    } catch (e) {
      message = error.message || "Unknown error";
    }

    return message;
  });
  return errorMessages.join("\n");
};
