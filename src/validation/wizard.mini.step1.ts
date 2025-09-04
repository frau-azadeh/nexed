import { boolean, z } from "zod";

export const MiniStep1Schema = z.object({
  accept: z
    .boolean()
    .refine((val) => val === true, { message: "پذیرش قوانین الزامی است" }),
});

export type MiniStep1FormValue = z.infer<typeof MiniStep1Schema>;
