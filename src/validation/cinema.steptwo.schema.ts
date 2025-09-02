import { z } from "zod";

const toInt = (val: unknown) =>
  val === "" || val == null ? undefined : Number(String(val));

export const StepTwoSchema = z.object({
  movie: z.enum(["dune2", "oppenheimer", "insideout2"], {
    required_error: "فیلم را انتخاب کنید",
  }),

  showtime: z.enum(["18:00", "20:00", "22:00"], {
    required_error: "سانس را انتخاب کنید",
  }),

  seatType: z.enum(["normal", "vip"], {
    required_error: "نوع صندلی را انتخاب کنید",
  }),

  quantity: z.preprocess(
    toInt,
    z
      .number({ required_error: "تعداد بلیط را وارد کنید" })
      .int("عدد صحیح باشد")
      .gte(1, "حداقل یک عدد")
      .lte(6, "حداکثر شش عدد"),
  ),
});

export type StepTwoFormValue = z.infer<typeof StepTwoSchema>;
