import { z } from "zod";

const persianRegex = /^[\u0600-\u06FF\s]+$/;

export const InformationSchema = z.object({
  firstName: z
    .string({ required_error: "نام الزامی است" })
    .regex(persianRegex, "فقط حروف فارسی مجاز است")
    .min(2, "نام باید حداقل 2 کاراکتر باشد"),
  lastName: z
    .string({ required_error: "نام خانوادگی الزامی است" })
    .regex(persianRegex, "فقط حروف فارسی مجاز است")
    .min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد"),
  maeitalStatus: z.enum(["single", "married", "divorces"]),
  genderL: z.enum(["male", "female"]),
  fatherName: z
    .string()
    .min(2, "نام پدر باید حداقل 2 کاراکتر باشد")
    .regex(persianRegex, "فقط حروف فارسی مجاز است")
    .optional(),
});

export type informationFormValue = z.infer<typeof InformationSchema>;
