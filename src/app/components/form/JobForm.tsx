"use client"

import { JobFormValue, JobSchema } from '@/validation/job.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../ui/Input'
import Select from '../ui/Select'
import TextArea from '../ui/TextArea'
import Button from '../ui/Button'
import toast from 'react-hot-toast'

const employmentOptions = [
  { label: "تمام‌وقت", value: "full_time" },
  { label: "پاره‌وقت", value: "part_time" },
  { label: "قراردادی", value: "contract" },
  { label: "کارآموزی", value: "intern" },
  { label: "فریلنس", value: "freelance" },
  { label: "موقت", value: "temporary" },
];

const JobForm = () => {
    const {
        register,
        handleSubmit,
        formState:{errors, isSubmitting},
    } = useForm<JobFormValue>({
        resolver: zodResolver(JobSchema),
        mode:"onTouched"
    })

    const submitRequest = (data: JobFormValue)=>
        new Promise<JobFormValue>((resolve)=>{
            setTimeout(()=> resolve(data),800)
        })

    const onSubmit = async (data:JobFormValue)=>{
        await toast.promise( submitRequest(data),{
   loading: "در حال ارسال…",
      success: "اطلاعات تحصیلی با موفقیت ثبت شد",
      error: "ارسال اطلاعات ناموفق بود",
        })

    }
  return (
<form onSubmit={handleSubmit(onSubmit)}
className='mx-auto mt-8 max-w-2xl'
>
      <div className="rounded-2xl  bg-white/80 p-6 shadow-sm backdrop-blur">
 <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">سوابق شغلی</h2>
          <p className="mt-1 text-sm text-gray-600">
            اطلاعات شغل اخیر خود را وارد کنید.
          </p>
    </div>
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Input
            id="company"
            label='نام شرکت'
            placeholder='نام شرکت خود را وارد کنید'
  {...register("company")}
  error={errors.company}
/>

<Input
    id="position"
    label="عنوان شغلی"
    placeholder='شغل خود را وارد کنید'
    {...register("position")}
    error={errors.position}
/>

<Select
    id="employmentType"
    label='نوع همکاری'
    placeholder='انتخاب کنید ...'
    options={employmentOptions}
    defaultValue=""
    {...register("employmentType")}
    error={errors.employmentType}
/>

<Input
    id='city'
    label='شهر'
    placeholder='شهر حود را وارد کنید'
    {...register("city")}
    error={errors.city}
/>

<Input
    id='salary'
    label='حقوق'
    placeholder='حقوق خود را وارد کنید'
    inputMode='numeric'
    {...register("salary")}
    error={errors.salary}
/>

<TextArea
    id="description"
    label='شرح وظایف'
    helperText='حداکثر 500 کاراکتر'
    placeholder='شرح وظایف را به صورت خلاصه وارد کنید'
    rows={4}
    {...register("description")}
    error={errors.description}
    className='md:col-span-2'
/>

<Button type='submit' variant='primary' size='md' loading={isSubmitting}>
    {isSubmitting ? "ثبت" : "در حال ثبت ..."}
</Button>

    </div>
    </div>

</form>
  )
}

export default JobForm