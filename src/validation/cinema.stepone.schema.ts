import { z } from "zod";

const faText = /^[\u0600-\u06FF\u200c\s-]+$/;

export const StepOneSchema = z.object({
    fullName: z
    .string({required_error:"نام و نام خانوادگی الزامی است"})
    .min(2,"نام و نام خانوادگی کوتاه است")
    .trim()
    .regex(faText,"فقط حروف فارسی مجاز است"),

    email: z
    .string({required_error:"ایمیل الزامی است"})
    .trim()
    .email("ایمیل نامعتبر است"),

})

export type StepOneFormValue = z.infer<typeof StepOneSchema>