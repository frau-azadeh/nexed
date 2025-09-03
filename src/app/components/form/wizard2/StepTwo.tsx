"use client";

import { Step2FormValue, Step2Schema } from "@/validation/wizard.step2.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, type SubmitErrorHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Select from "@/app/components/ui/Select";
import Button from "../../ui/Button";

const militaryOptions = [
  { label: "پایان خدمت", value: "completed" },
  { label: "معافیت", value: "exempted" },
  { label: "در حال انجام", value: "inProgress" },
];

type Props = {
  onNext?: (data: Step2FormValue) => void;
  onBack?: () => void;
  defaultValues?: Partial<Step2FormValue>; // ✅ اختیاری
};

const StepTwo: React.FC<Props> = ({ onNext, onBack, defaultValues }) => {
  const {
    control,
    trigger,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Step2FormValue>({
    resolver: zodResolver(Step2Schema),
    mode: "onTouched",
    defaultValues: { ...defaultValues }, // ✅ اگر undefined باشد، {} می‌شود
  });

  const gender = watch("gender");

  useEffect(() => {
    if (gender === "female") {
      setValue("militaryStatus", undefined);
      void trigger("militaryStatus");
    }
  }, [gender, setValue, trigger]);

  const goNext = async () => {
    const ok = await trigger();
    if (!ok) {
      const first =
        errors.firstName ??
        errors.lastName ??
        errors.gender ??
        errors.militaryStatus;
      toast.error(first?.message ?? "لطفاً خطاهای این مرحله را برطرف کنید");
      return;
    }
    onNext?.({
      firstName: watch("firstName")!,
      lastName: watch("lastName")!,
      gender: watch("gender")!,
      militaryStatus: watch("militaryStatus"),
    });
  };

  const onError: SubmitErrorHandler<Step2FormValue> = () => {
    toast.error("لطفاً خطاهای این مرحله را برطرف کنید");
  };

  return (
    <form
      onSubmit={handleSubmit(() => void goNext(), onError)}
      className="mx-auto max-w-xl rounded-2xl bg-white/90 p-6 shadow-md"
      dir="rtl"
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold">مرحله ۲: اطلاعات هویتی</h3>
        <p className="text-sm text-gray-700">
          نام و نام خانوادگی و جنسیت را وارد کنید
        </p>
      </div>

      {/* ✅ grid-cols درست شد */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="firstName"
          label="نام"
          placeholder="نام خود را وارد کنید"
          {...register("firstName")}
          error={errors.firstName}
        />

        <Input
          id="lastName"
          label="نام خانوادگی"
          placeholder="نام خانوادگی خود را وارد کنید"
          {...register("lastName")}
          error={errors.lastName}
        />

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            جنسیت
          </label>

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              // ✅ items-center درست شد
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="male"
                    checked={field.value === "male"}
                    onChange={() => field.onChange("male")}
                  />
                  مرد
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="female"
                    checked={field.value === "female"}
                    onChange={() => field.onChange("female")}
                  />
                  زن
                </label>
              </div>
            )}
          />

          {errors.gender && (
            <p className="mt-1 text-xs text-red-600">{errors.gender.message}</p>
          )}
        </div>

        {gender === "male" && (
          <Select
            id="militaryStatus"
            label="وضعیت سربازی"
            placeholder="انتخاب کنید ..."
            options={militaryOptions}
            {...register("militaryStatus")}
            error={errors.militaryStatus}
            defaultValue=""
            className="md:col-span-2"
          />
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          قبلی
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? "در حال بررسی..." : "ادامه"}
        </Button>
      </div>
    </form>
  );
};

export default StepTwo;
