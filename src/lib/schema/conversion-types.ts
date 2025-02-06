import { z } from "zod";

export const schema = {
  conversionParams: z.object({
    source: z.string().catch(""),
    target: z.string().catch(""),
  }),
};
