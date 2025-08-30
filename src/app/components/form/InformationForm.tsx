import {type  informationFormValue, InformationSchema } from '@/validation/information.schema'
import React from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import Input from '../ui/Input'

const InformationForm = () => {
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<informationFormValue>({
         resolver: zodResolver(InformationSchema),
         mode : "onTouched"
    })

    const onSubmit = (data: informationFormValue) =>{
        console.log("submit", data)
        alert("اطلاعات با موفقیت ثبت شد")
    }
  return (
   <form
    onSubmit={handleSubmit(onSubmit)}
    className='max-w-md mx-auto space-y-4 border rounde p-4 bg-white shadow'
   >
    <div>
        <label className='block mb-1 font-medium'>نام </label>
        <Input type='text'
        placeholder='نام خودر را وارد کنید'
  {...register("firstName")}/>
  {errors.firstName && (
    <p className='text-sm text-red-600'>{errors.firstName.message}</p>
  )}
    </div>


    </form>
  )
}

export default InformationForm