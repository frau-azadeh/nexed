import { z } from "zod";

export const EventMiniStep2Schema = z
  .object({
    attendance: z.enum(["inPerson", "online"], {
      required_error: "نوع حضور را انتخاب کنید",
    }),

    city: z.string().trim().optional(),

    platform: z
      .enum(["zoom", "meet"], { message: "پلتفرم خود را مشخص کنید" })
      .optional(),
  })

  .superRefine((val, ctx) => {
    if (val.attendance === "inPerson" && (!val.city || val.city.length < 2)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["city"],
        message: "شهر را وارد کنید",
      });
    }

    if (val.attendance === "online" && val.city) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["city"],
        message: "برای حضور انلاین نیازی به شهر نیست",
      });
    }
  });

export type EventMiniStep2FormValue = z.infer<typeof EventMiniStep2Schema>;
