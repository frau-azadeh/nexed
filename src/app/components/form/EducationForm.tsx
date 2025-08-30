"use client";

import {
  EducationFormValue,
  EducationSchema,
} from "@/validation/education.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import Select from "../ui/Select";
import Input from "../ui/Input";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import toast from "react-hot-toast";

const degreeOptions = [
  { label: "دیپلم", value: "diploma" },
  { label: "کاردانی", value: "associate" },
  { label: "کارشناسی", value: "bachelor" },
  { label: "کارشناسی ارشد", value: "master" },
  { label: "دکتری", value: "phd" },
  { label: "سایر", value: "other" },
];

const EducationForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<EducationFormValue>({
    resolver: zodResolver(EducationSchema),
    mode: "onTouched",
  });

  const submitRequest = (data: EducationFormValue) =>
    new Promise<EducationFormValue>((resolve) => {
      setTimeout(() => resolve(data), 800);
    });

  const onSubmit = async (data: EducationFormValue) => {
    await toast.promise(submitRequest(data), {
      loading: "در حال ارسال…",
      success: "اطلاعات تحصیلی با موفقیت ثبت شد",
      error: "ارسال اطلاعات ناموفق بود",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      dir="rtl"
      className="mx-auto mt-8 max-w-2xl"
    >
      <div className="rounded-2xl  bg-white/80 p-6 shadow-sm backdrop-blur">
        {/* Header */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">اطلاعات تحصیلی</h2>
          <p className="mt-1 text-sm text-gray-600">
            لطفاً اطلاعات مربوط به آخرین مقطع تحصیلی خود را وارد کنید.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            id="degree"
            placeholder="انتخاب کنید ..."
            label="مقطع تحصیلی"
            options={degreeOptions}
            defaultValue=""
            {...register("degree")}
            error={errors.degree}
          />
          <Input
            id="major"
            label="رشته تحصیلی"
            placeholder="رشته تحصیلی خود را وارد کنید"
            {...register("major")}
            error={errors.major}
          />
          <Input
            id="university"
            label="نام دانشگاه"
            placeholder="نام دانشگاه خود را وارد کنید"
            {...register("university")}
            error={errors.university}
          />
          <Input
            id="city"
            label="شهر"
            placeholder="نام شهر خود را وارد کنید"
            {...register("city")}
            error={errors.city}
          />
          <div className="md:col-span-2">
            <label
              htmlFor="isCurrent"
              className="text-sm font-medium text-gray-300 focus:ring-indigo-500"
            >
              در حال تحصیل هستم
            </label>
            <div className="mt-2">
              <input
                id="isCurrent"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register("isCurrent")}
              />
              {errors.isCurrent && (
                <p className="text-xs text-red-600">
                  {errors.isCurrent.message}
                </p>
              )}
            </div>
            <TextArea
              id="description"
              label="توضیحات"
              rows={4}
              placeholder="توضیحات تکمیلی ..."
              error={errors.description}
              className="md:col-span-2 border border-gray-300"
              helperText="حداکثر 500 کاراکتر"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
          >
            {isSubmitting ? "ثبت" : "در حال ثبت ..."}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EducationForm;
