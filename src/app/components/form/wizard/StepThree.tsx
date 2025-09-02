import { StepOneFormValue } from "@/validation/cinema.stepone.schema";
import {
  StepThreeFormValue,
  StepThreeSchema,
} from "@/validation/cinema.stepthree.schema";
import { StepTwoFormValue } from "@/validation/cinema.steptwo.schema";
import React from "react";
import {
  Controller,
  useForm,
  type SubmitHandler,
  type SubmitErrorHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Toggle from "../../ui/Toggle";
import Button from "../../ui/Button";

const PRICE: Record<"normal" | "vip", number> = {
  normal: 250_000,
  vip: 400_000,
};

type Props = {
  onBack?: () => void;
  onSuccess?: () => void;
  step1: StepOneFormValue;
  step2: StepTwoFormValue;
};

const StepThree: React.FC<Props> = ({ onBack, onSuccess, step1, step2 }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StepThreeFormValue>({
    resolver: zodResolver(StepThreeSchema),
    mode: "onTouched",
    defaultValues: { accept: true },
  });

  const total = PRICE[step2.seatType] * Number(step2.quantity || 0);

  // شبیه‌سازی ارسال نهایی به سرور
  const submitRequest = (payload: {
    step1: StepOneFormValue;
    step2: StepTwoFormValue;
  }) =>
    new Promise<{ ok: true }>((resolve) =>
      setTimeout(() => resolve({ ok: true }), 900),
    );

  const onSubmit: SubmitHandler<StepThreeFormValue> = async () => {
    await toast.promise(submitRequest({ step1, step2 }), {
      loading: "در حال ثبت سفارش…",
      success: "سفارش با موفقیت ثبت شد 🎬",
      error: "ثبت سفارش ناموفق بود",
    });
    onSuccess?.();
  };

  const onError: SubmitErrorHandler<StepThreeFormValue> = () => {
    toast.error(errors.accept?.message ?? "لطفاً قوانین را بپذیرید");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="mx-auto max-w-xl rounded-2xl bg-white/90 p-6 shadow-md "
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold">مرحله 3 : تایید نهایی</h3>
        <p className="text-sm text-gray-700">
          خلاصه سفارش خود را بررسی و قوانین را بپذیرید
        </p>
      </div>
      <div className="mb-4 space-y-2 rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
        <div>
          <span className="text-gray-500">نام : {step1.fullName}</span>
        </div>
        <div>
          <span className="text-gray-500">ایمیل {step1.email}</span>
        </div>
        <div className="h-px bg-gray-200 my-1" />
        <div>
          <span className="text-gray-500">فیلم: {step2.movie}</span>
        </div>
        <div>
          <span className="text-gray-500">سانس: {step2.showtime}</span>
        </div>
        <div>
          <span className="text-gray-500">
            نوع صندلی: {step2.seatType === "vip" ? "Vip" : "معمولی"}
          </span>
        </div>
        <div>
          <span className="text-gray-500">تعدا: {step2.quantity}</span>
        </div>
        <div>
          <span className="text-gray-500">
            جمع کل تومان: {total.toLocaleString("fa-IR")}
          </span>
        </div>
      </div>
      <div className="mb-2">
        <Controller
          name="accept"
          control={control}
          render={({ field }) => (
            <Toggle
              checked={Boolean(field.value)}
              onChange={field.onChange}
              label="قوانین و شرایط را میپذیرم"
            />
          )}
        />
        {errors.accept && (
          <p className="mt-1 text-sm text-red-600">{errors.accept.message}</p>
        )}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          قبلی
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? "ثبت نهایی" : "در جال ثبت"}
        </Button>
      </div>
    </form>
  );
};

export default StepThree;
