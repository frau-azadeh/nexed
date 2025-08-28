import { z } from "zod";

export const InformationSchema = z.object({
  firstName: z
    .string({ required_error: "نام الزامی است" })
    .min(2, "نام باید حداقل 2 کاراکتر باشد"),
  lastName: z
    .string({ required_error: "نام خانوادگی الزامی است" })
    .min(2, "نام خانوادگی باید حداقل 2 کاراکتر باشد"),
  maeitalStatus: z.enum(["single", "married", "divorces"]),
  genderL: z.enum(["male","female"]),
  fatherName: z.string().min(2, "نام پدر باید حداقل 2 کاراکتر باشد").optional(),
});

export type informationFormValue = z.infer<typeof InformationSchema>;
