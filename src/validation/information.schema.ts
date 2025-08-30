import { z } from "zod";

const persianRegex = /^[\u0600-\u06FF\s]+$/;
const emptyToUnde = (val: unknown) => (val == "" ? undefined : val)
export const InformationSchema = z.object({
  firstName: z
    .string({ required_error: "نام الزامی است" })
    .regex(persianRegex, "فقط حروف فارسی مجاز است")
    .trim()
    .min(2, "نام باید حداقل 2 کاراکتر باشد"),
  lastName: z
    .string({ required_error: "نام خانوادگی الزامی است" })
    .regex(persianRegex, "فقط حروف فارسی مجاز است")
    .trim()
    .min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد"),
  maeitalStatus: z
  .preprocess(emptyToUnde,
  z.enum(["single", "married", "divorced"],{required_error:"وضعیت تاهل را انتخاب کنید"})),
  gender: z.preprocess(emptyToUnde,z.enum(["male", "female"],{required_error:"جنسیت را انتخاب کنید"})),
  fatherName: z
    .string()
    .min(2, "نام پدر باید حداقل 2 کاراکتر باشد")
    .regex(persianRegex, "فقط حروف فارسی مجاز است")
    .trim()
    .optional(),
});

export type informationFormValue = z.infer<typeof InformationSchema>;
