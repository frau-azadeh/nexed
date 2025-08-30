import { number, z } from "zod";

const emptyToUndef: (val:unknown)=> unknown = (val)=> val === "" ? undefined : val;
const faText = /^[\u0600-\u06FF\u200c\s-]+$/;

export const JobSchema = z.object({
    company: z
    .string({required_error:"نام شرکت الزامی می باشد"})
    .min(2, "نام شرکت خیلی کوتاه است")
    .regex(faText,"نام شرکت باید فارسی باشد"),

    position: z
    .string({required_error: "سمت یا عنوان شغلی الزامی است"})
    .regex(faText, "عنوان شغلی باید فارسی باشد")
    .min(2,"عنوان شغلی خیلی کوتاه است"),

    employmentType: z.preprocess(
        emptyToUndef,
        z.enum(      ["full_time", "part_time", "contract", "intern", "freelance", "temporary"],
            {required_error:"نوع همکاری را انتخاب کنید"}
)
    ),

    isCurrent: z.boolean().default(false),

    city: z
    .string()
    .min(1,"نام شهر خیلی کوتاه است")
     .regex(faText, "نام شهر باید فارسی باشد")
     .optional(),

     description: z
     .string()
     .max(500, "حداکثر 500 کاراکتر")
     .trim(),

     salary: z
     .preprocess(
        (val)=>(val === "" || val==null ? undefined :Number(String(val))),
    z.number()
    .gte(0,"عدد معتبر وارد کنید")
    )
    .optional(),
})

export type JobFormValue = z.infer <typeof JobSchema>