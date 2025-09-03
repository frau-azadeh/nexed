import { z } from "zod";

export const Step1Schema = z.object({
  //  accept: z.literal(true, {
  //  errorMap: () => ({ message: "قوانین و شرایط را میپذیرم" }),
  accept: z
    .boolean()
    .refine((val) => val === true, { message: "پذیرش قوانین الزامی است" }),
});

export type Step1FormValue = z.infer<typeof Step1Schema>;
