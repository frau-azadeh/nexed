import { z } from "zod";

const faText = /^[\u0600-\u06FF\u200c\s]+$/

export const Step2Schema = z.object({
    firstName: z 
        .string({required_error: "نام الزامی است"})
        .trim()
        .min(2,"حداقل دو کاراکتر")
        .regex(faText,"نام باید با حروف فارسی باشد")
        .max(15,"کاراکتر نام زیاد است"),
    
    lastName: z
        .string({required_error: "نام خانوادگی الزامی است"})
        .trim()
        .regex(faText, "نام خانوادگی باید با حروف فارسی باشد")
        .min(2,"حداقل 2 کاراکتر")
        .max(30,"تعداد کاراکتر زیاد است"),

    gender: z.enum(["male","female"],{
        required_error:"جنسیت را انتخاب کنید"
    }),

    militaryStatus: z.enum(["completed", "exempted", "inProgress"]).optional(),
})

.superRefine((val,ctx)=>{
    if(val.gender==="male"&& !val.militaryStatus){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path:["militrayStatus"],
            message:"وضعیت سربازی را انتخاب کنید"
        });
    }
    if(val.gender === "female" && val.militaryStatus){
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            path:["militaryStatus"],
            message:"برای خانم ها وضعیت سربازی الزامی نیست"
        })
    }
})

export type Step2FormValue = z.infer<typeof Step2Schema>