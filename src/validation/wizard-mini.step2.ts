import { z } from "zod";

export const MiniStep2Schema = z
  .object({
    firstName: z
      .string({ required_error: "نام الزامی است" })
      .trim()
      .min(2, "حداقل دو کاراکتر"),

    lastName: z
      .string({ required_error: "نام خانوادگی الزامی است" })
      .trim()
      .min(2, "حداقل دو کاراکتر"),

    gender: z.enum(["male", "famale"], {
      required_error: "جنسیت را انتخاب کنید",
    }),

    militaryStatus: z.enum(["completed", "exempted", "inProgress"]).optional(),
  })

  .superRefine((val, ctx) => {
    if (val.gender === "male" && !val.militaryStatus) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["militrayStatus"],
        message: "وضعیت سربازی را انتخاب کنید",
      });
    }

    if (val.gender === "famale" && val.militaryStatus) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["militrayStatus"],
        message: "برای خانم ها وضعیت سربازی لازم نیست",
      });
    }
  });

export type MiniStep2FormValue = z.infer<typeof MiniStep2Schema>;
