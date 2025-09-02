import { z } from "zod";

export const StepThreeSchema =z.object({
    accept: z.literal(true,{
        errorMap: ()=>({message: "پذیرش قوانین الزامی است"})
    })
})

export type StepThreeFormValue = z.infer<typeof StepThreeSchema>