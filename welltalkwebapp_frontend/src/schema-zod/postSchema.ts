import * as z from "zod";

export const postSchema = z.object({
  title: z.string(),
  content: z.string(),
  photoData: z.any(),
});
