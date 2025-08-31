import { unknown, z } from "zod";

const emptyToUndef: (val: unknown) => unknown = (val) =>
  val === "" ? undefined : val;
const faText = /^[\u0600-\u06FF\u200c\s-]+$/;
const iranMobile = /^09\d{9}$/;

export const ContactSchema = z.object({
  fullName: z
    .string({ required_error: "نام و نام خانوادگی الزامی است" })
    .min(2, "خیلی کوتاه است")
    .trim()
    .regex(faText, "نام باید فارسی باشد"),

  email: z.string().trim().email("ایمیل نامعتبر است"),

  phone: z
    .string()
    .trim()
    .regex(iranMobile, "شماره موبایل نامعتبر است")
    .optional(),

  topic: z.preprocess(
    emptyToUndef,
    z.enum(["support", "sales", "feedback", "other"], {
      required_error: "موضوع پیام را انتخاب کنید",
    }),
  ),

  subject: z
    .string()
    .trim()
    .regex(faText, "عنوان باید فارسی باشد")
    .min(2, "عنوان خیلی کوتاه است")
    .optional(),

  message: z
    .string()
    .trim()
    .min(10, "حداقل 10 کاراکتر")
    .max(500, "حداکثر 500 کاراکتر"),
});

export type ContactFormValue = z.infer<typeof ContactSchema>;
