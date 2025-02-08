import { z } from "zod";
import { allowedExtensions } from "../hooks/ffmpeg/allowed-extensions";

const MAX_FILE_SIZE = 2 * Math.pow(2, 30); // 2GB limit for debugging

export const schema = {
  conversionParams: z.object({
    source: z.string().catch(""),
    target: z.string().catch(""),
  }),
  sourceFile: z
    .instanceof(File, { message: "A file is required to convert." })
    .refine((file) => {
      const fileType = file.type?.split("/")[0];
      if (!Object.keys(allowedExtensions).includes(fileType)) {
        return false;
      }

      const fileExtensions =
        allowedExtensions[fileType as keyof typeof allowedExtensions];
      const fileExtension = file.name.split(".").pop();
      if (!fileExtensions.includes(`.${fileExtension}`)) {
        return false;
      }

      return true;
    }, "Sorry, we currently do not support this file type.")
    .refine((file) => {
      if (file.size > MAX_FILE_SIZE) {
        return false;
      }
      return true;
    }, "Your file is greater than the max file size allowed."),
};
