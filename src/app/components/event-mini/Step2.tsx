import { EventMiniStep2FormValue, EventMiniStep2Schema } from '@/validation/event-mini.step2';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';

type Props = {
    onBack:() => void;
    onNext: (data:EventMiniStep2FormValue)=> void
    defaultValues?: Partial<EventMiniStep2FormValue>
}

const Step2:React.FC<Props> = ({onBack, onNext, defaultValues}) => {
    const{
        control,
        register,
        trigger, 
        setValue,
        watch,
        handleSubmit,
        formState:{errors, isSubmitting},
    }=useForm<EventMiniStep2FormValue>({
        resolver:zodResolver(EventMiniStep2Schema),
        mode:"onTouched",
        defaultValues:{attendance:undefined, ...defaultValues},
    })

    const attendance = watch ("attendance")

    useEffect(()=>{
        if(attendance === "inPerson"){
            setValue("platform", undefined);
            void trigger(["platform","city"])
        }
        else if(attendance === "online"){
            setValue("city", undefined)
            void trigger(["city", "platform"])
        }
    },[attendance, setValue, trigger])

    const goNext = async ()=>{
        const ok = await trigger();
        if(!ok){
            const first = errors.attendance ?? errors.city ?? errors.platform;
            toast.error(first?.message??"لطفا خطا ها را رفع کنید")
            return;
        }
        onNext({
            attendance:watch("attendance")!,
            city: watch("city")!,
            platform: watch("platform"),
        })
    }

    const onError: SubmitErrorHandler<EventMiniStep2FormValue> = () => {
        const first = errors.attendance ?? errors.city ?? errors.platform;
        toast.error(first?.message??"لطفا خطاهای این مرحله را رفع کنید")

    }

  return (
    <form
        onSubmit={handleSubmit(()=> void goNext(), onError)}
        className='mx-auto max-w-md rounded-2xl bg-white/90 p-6 shadow-md'
    >
        <h3 className='mb-3 text-lg font-bold'>مرحله 2 : نوع حضور</h3>

        <div className='mb-3'>
        <label className="mb-1 block text-sm text-gray-700">نحوه حضور</label>
        <Controller
            name="attendance"
            control={control}
            render={({field})=>(
                <div className='flex items-center gap-6 '>
                    <label className='flex items-center gap-2'>
                        <input
                            type='radio'
                            value="inPerson"
                            checked={field.value === "inPerson"}
                            onChange={()=>field.onChange("inPerson")}
                        />
                        حضوری
                    </label>
                    <label className='flex items-center gap-6 '>
                        <input 
                            type='radio'
                            value="online"
                            checked={field.value==="online"}
                            onChange={()=> field.onChange("online")}
                        />
                        آنلاین
                    </label>
                </div>
            )}
        />
        {errors.attendance&&(
            <p className='mt-1 text-xs text-red-600'>{errors.attendance.message}</p>
        )}

        </div>

        {attendance === "inPerson"&&(
            <div>
                <Input
                    id='city'
                    placeholder="نام شهر را وارد کنید"
                    label='نام شهر'
                    {...register("city")}
                    error={errors.city}
                />
            </div>
        )}

          {attendance === "online" && (
        <div className="mb-3">
          <label className="mb-1 block text-sm text-gray-700">پلتفرم</label>
          <select
            className="w-full rounded-md border px-3 py-2 text-sm"
            defaultValue=""
            {...register("platform")}
          >
            <option value="" disabled>
              انتخاب کنید…
            </option>
            <option value="zoom">Zoom</option>
            <option value="meet">Google Meet</option>
          </select>
          {errors.platform && (
            <p className="mt-1 text-xs text-red-600">
              {errors.platform.message}
            </p>
          )}
        </div>
      )}

      <div>
        <Button type='button' onClick={onBack}>قبلی</Button>
        <Button type='submit' loading={isSubmitting}>{isSubmitting ? "در حال بررسی ..." : "مرحله بعدی"}</Button>
      </div>

    </form>
  )
}

export default Step2