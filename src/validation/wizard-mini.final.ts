import { z } from "zod";

export const MiniFinalSchema = z.object({
    confirm: z
    .boolean()
    .refine((val)=>val === true,{message: "برای ارسال نهایی باید تایید شود"})
})

export type MIniFinalFormValue = z.infer<typeof MiniFinalSchema>