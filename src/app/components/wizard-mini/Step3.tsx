import {
  MIniFinalFormValue,
  MiniFinalSchema,
} from "@/validation/wizard-mini.final";
import { MiniStep2FormValue } from "@/validation/wizard-mini.step2";
import { MiniStep1FormValue } from "@/validation/wizard.mini.step1";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { date } from "zod";
import Button from "../ui/Button";

type Props = {
  s1: MiniStep1FormValue;
  s2: MiniStep2FormValue;
  onBack: () => void;
  onDone: () => void;
};

const Step3: React.FC<Props> = ({ s1, s2, onBack, onDone }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MIniFinalFormValue>({
    resolver: zodResolver(MiniFinalSchema),
    mode: "onTouched",
    defaultValues: { confirm: false },
  });

  const submitRequest = (data: MIniFinalFormValue) =>
    new Promise<MIniFinalFormValue>((resolve) => {
      setTimeout(() => resolve(data), 800);
    });

  const onSubmit = async (data: MIniFinalFormValue) => {
    await toast.promise(submitRequest(data), {
      loading: "در حال ارسال...",
      success: "اطلاعات با موفقیت ثبت شد 🎉",
      error: "ارسال ناموفق بود",
    });

    onDone();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="mb-3 text-lg font-bold">مرحله 3 : مرور و تایید</h3>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="rounded-md border bg-gray-50 p-3">
          <p className="font-semibold">مرحله ۱</p>
          <p>قوانین: پذیرفته شده ✅</p>
        </div>
        <div className="rounded-md border bg-gray-50 p-3">
          <p className="font-bold">مرحله 2</p>
          <p>نام: {s2.firstName}</p>
          <p>نام خانوادگی: {s2.lastName}</p>
          <p>جنسیت: {s2.gender === "male" ? "مرد" : "زن"}</p>
          {s2.gender === "male" && <p>وضعیت سربازی: {s2.militaryStatus}</p>}
        </div>
      </div>
      <div className="mt-4 rounded-md border bg-gray-50 p-3">
        <Controller
          name="confirm"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              اطلاعات بالا را بررسی و تایید میکنم
            </label>
          )}
        />

        {errors.confirm && (
          <p className="text-red-600">{errors.confirm.message}</p>
        )}
      </div>

      <div>
        <Button type="button" onClick={onBack}>
          قبلی
        </Button>
        <Button type="submit" variant="primary" loading={isSubmitting}>
          {isSubmitting ? "در حال ارسال ..." : "ارسال نهایی"}
        </Button>
      </div>
    </form>
  );
};

export default Step3;
