import { MiniStep1FormValue, MiniStep1Schema } from '@/validation/wizard.mini.step1'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Button from '../ui/Button'


type Props = {
    onNext : (data: MiniStep1FormValue)=> void
}

const Step1:React.FC<Props> = ({onNext}) => {
    const {
        control,
        handleSubmit,
        formState:{errors, isSubmitting}
    } = useForm<MiniStep1FormValue>({
        resolver: zodResolver(MiniStep1Schema),
        mode:"onTouched",
        defaultValues:{accept: false},
    })

    const onSubmit = (data:MiniStep1FormValue)=>{
        onNext(data);
        toast.success("مرحله اول تایید شد");
    }

  return (
   <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto max-w-xl rounded-md bg-white/90 p-6 shadow-md'
   >

    <h3 className='mb-3 text-lg font-bold'>مرحله اول : پذیرفتن قوانین</h3>
    <div className='rounded-md border bg-gray-50 p-4'>
        <Controller
            name='accept'
            control={control}
            render={({field})=>(
                <label className='flex cursor-pointer items-center gap-2 text-sm'>
                    <input
                        type='checkbox'
                        checked={field.value}
                        onChange={(e)=>field.onChange(e.target.checked)}
                    />
                    قوانین را مطالعه و میپذیرم.
                </label>
            )}
        />
        {errors.accept &&(
            <p className='text-red-500 mt-2 text-xs'>{errors.accept.message}</p>
        )}
    </div>
    <Button type='submit' loading={isSubmitting} variant='primary'>
        {isSubmitting ? "در حال بررسی ... " : "مرحله بعدی"}
    </Button>

   </form>
  )
}

export default Step1