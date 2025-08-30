"use client";
import {
  type informationFormValue,
  InformationSchema,
} from "@/validation/information.schema";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

const maritalOptions = [
  { label: "مجرد", value: "single" },
  { label: "متاهل", value: "married" },
  { label: "طلاق گرفته", value: "divorced" },
];

const genderOption = [
  { label: "مرد", value: "male" },
  { label: "زن", value: "female" },
];

export default function InformationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<informationFormValue>({
    resolver: zodResolver(InformationSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: informationFormValue) => {
    // شبیه‌سازی تاخیر
    await new Promise((r) => setTimeout(r, 600));
    console.log("submit", data);
    alert("اطلاعات با موفقیت ثبت شد");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      dir="rtl"
      className="mx-auto mt-8 max-w-2xl"
    >
      <div className="rounded-2xl  bg-white/80 p-6 shadow-sm backdrop-blur">
        {/* Header */}
        <div className="mb-6 border-b pb-4 border-gray-500">
          <h2 className="text-xl font-bold text-gray-900">فرم اطلاعات فردی</h2>
          <p className="mt-1 text-sm text-gray-600">
            لطفاً اطلاعات زیر را با دقت تکمیل کنید.
          </p>
        </div>

        {/* Grid */}
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
            placeholder="نام خانوادگی را وارد کنید"
            {...register("lastName")}
            error={errors.lastName}
          />

          <Select
            id="gender"
            label="جنسیت"
            placeholder="انتخاب کنید…"
            options={genderOption}
            defaultValue=""
            {...register("gender")}
            error={errors.gender as any}
          />

          <Select
            id="maeitalStatus"
            label="وضعیت تاهل"
            placeholder="انتخاب کنید…"
            options={maritalOptions}
            defaultValue=""
            {...register("maeitalStatus")}
            error={errors.maeitalStatus as any}
          />

          <Input
            id="fatherName"
            label="نام پدر (اختیاری)"
            placeholder="مثلاً محمد"
            {...register("fatherName")}
            error={errors.fatherName}
            className="md:col-span-2"
          />
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
          >
            {isSubmitting ? "در حال ثبت…" : "ثبت"}
          </Button>
        </div>
      </div>
    </form>
  );
}
