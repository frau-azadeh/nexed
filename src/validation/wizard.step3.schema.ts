import { z } from "zod";

const toNumberOrUndef = (val:unknown)=> val === "" || val === null || val === undefined ? undefined : Number(val)

export const Step3Schema = z.object({
    maritalStatus: z
    .enum(["single","married"],{
        required_error:"وضعیت تاهل را انتخاب کنید",
    }),
    childrenCount: z
    .preprocess(
        toNumberOrUndef,
        z
        .number()
        .int("تعداد باید عدد صحیح باشد")
        .min(0,"تعداد نمیتواند منفی باشد")
        .max(10,"حداکثر 10 فرزند")
        .optional()
    ),
})

.superRefine((val, ctx)=>{
    if(val.maritalStatus === "married" && val.childrenCount === undefined){
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            path:["childrenCount"],
            message: "تعداد فرزند را وارد کنید",
        });
    }

    if(val.maritalStatus === "single" && val.childrenCount !== undefined){
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            path: ["childrenCount"],
            message:"برای افراد مجرد این فیلد الزامی نیست"
        })
    }
})

export type Step3FormValue = z.infer<typeof Step3Schema>