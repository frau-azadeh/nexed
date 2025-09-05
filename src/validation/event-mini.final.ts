import { z } from "zod";

export const EventMiniFinalSchema = z.object({
    confirm: z
    .boolean()
    .refine((val)=> val === true,{message: "برای ارسال نهایی تایید کنید"}),
})

export type EventMiniFinalFormSchema  = z.infer<typeof EventMiniFinalSchema>