import { z } from "zod";

export const FinalConfirmSchema = z.object({
  accept: z
    .boolean()
    .refine((val) => val === true, { message: "پذیرش قوانین الزامی است" }),
});

export type FinalConfirmFormValue = z.infer<typeof FinalConfirmSchema>;
