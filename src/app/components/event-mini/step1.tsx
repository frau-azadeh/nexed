import { EventMiniStep1FormValue, EventMiniStep1Schema } from '@/validation/event-mini.step1'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../ui/Input';
import Button from '../ui/Button';

type Props = {
    onNext: (data: EventMiniStep1FormValue) => void;
    defaultValues?: Partial<EventMiniStep1FormValue>
}

const step1:React.FC<Props> = ({onNext, defaultValues}) => {
    const{
        register,
        handleSubmit,
        formState:{errors, isSubmitting}
    }=useForm<EventMiniStep1FormValue>({
        resolver: zodResolver(EventMiniStep1Schema),
        mode: "onTouched",
        defaultValues: {...defaultValues}
    })

const onSubmit = (data: EventMiniStep1FormValue)=>{
    toast.success("مرحله اول ثبت شد")
    onNext(data);
}

const onError : SubmitErrorHandler<EventMiniStep1FormValue> = () =>{
    const first = errors.email ?? errors.fullName;
    toast.error(first?.message??"لطفا خطا ها را برطرف نمایید")
}

  return (
   <form 
    onSubmit={handleSubmit(onSubmit, onError)}
    className='mx-auto max-w-md rounded-2xl bg-white/60 p-6 shadow-md'
   >
    <h3 className='mb-3 text-lg font-bold'>مرحله اول : اطلاعات تماس </h3>
        <div className='grid grid-cols-1 gap-4'>
            <Input
                id='fullName'
                label='نام و نام خانوادگی'
                {...register("fullName")}
                error={errors.fullName}
                placeholder='نام و نام خانوادگی خود را وارد کنید'
            />

            <Input
                id="email"
                label='ایمیل'
                {...register("email")}
                error={errors.email}
                placeholder='ایمیل خود را وارد کنید'
            />
        </div>
        <div>
            <Button 
                type="button"
                loading={isSubmitting}
            >
                {isSubmitting ?"مرحله بعدی" : "در حال بررسی ..."}
            </Button>
        </div>
   </form>
  )
}

export default step1