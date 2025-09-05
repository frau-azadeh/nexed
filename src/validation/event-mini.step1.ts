import { z } from "zod";

const faText = /^[\u0600-\u06FF\u200c\s-]+$/;

export const EventMiniStep1Schema = z.object({
  fullName: z
    .string({ required_error: "نام و نام خانوادگی الزامی است" })
    .trim()
    .min(2, "حداقل 2 کاراکتر")
    .regex(faText, "نام و نام خانوادگی فارسی باید باشد"),

 email:z
    .string({required_error:"ایمیل الزامی است"})
    .trim()
    .email("ایمیل نامعتبر است")
});

export type EventMiniStep1FormValue = z.infer<typeof EventMiniStep1Schema>
