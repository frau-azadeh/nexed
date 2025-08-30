import { z } from "zod";

const emptyToUndef = (val : unknown)=>(val === "" ? undefined : val)
const faText = /^[\u0600-\u06FF\u200c\s-]+$/;

export const EducationSchema = z
.object({
    degree: z.preprocess(
        emptyToUndef,
      z.enum(["diploma", "associate", "bachelor", "master", "phd", "other"], {
        required_error: "مقطع تحصیلی را انتخاب کنید",
  
})
    ),
    major: z
    .string({required_error:"رشته تحصیلی الزامی است"})
    .regex(faText, "رشته باید با حروف فارسی نوشته شود")
    .min(2, "عنوان رشته بسیار کوتاه است"),

    university: z
    .string({required_error:"نام دانشگاه الزامی است"})
    .regex(faText,"نام دانشگاه باید فارسی باشد")
    .min(2,"نام دانشگاه بسیار کوتاه است"),

    isCurrent: z.boolean().default(false),
    city: z
    .string()
    .regex(faText, "نام شهر باید فارسی باشد")
    .min(2, "نام شهر بسیار کوتاه است")
    .optional(),

    description: z
    .string()
    .max(500,"حداکثر ۵۰۰ کاراکتر")
    .optional(),

})

export type EducationFormValue = z.infer<typeof EducationSchema>