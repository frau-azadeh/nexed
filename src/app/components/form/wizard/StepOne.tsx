"use client"

import {
  StepOneFormValue,
  StepOneSchema,
} from "@/validation/cinema.stepone.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const StepOne = () => {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<StepOneFormValue>({
    resolver: zodResolver(StepOneSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", email: "" },
  });

  const submitRequest = (data: StepOneFormValue) =>
    new Promise<StepOneFormValue>((resolve) => {
      setTimeout(() => resolve(data), 800);
    });

  const onSubmit = async (data: StepOneFormValue) => {
    await toast.promise(submitRequest(data), {
      loading: "در حال اتصال",
      success: "مرحله اول ذخیره شد",
      error: "اتصال برقرار نشد",
    });
  };
  return(
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="mx-auto max-w-xl rounded-2xl bg-white/90 p-6 shadow-md"
  >
    <div className="mb-4">
      <h3 className="text-lg font-bold">مرحله اول : اطلاعات تماس</h3>
      <p className="text-sm text-gray-700">نام و ایمیل خود را وارد کنید</p>
    </div>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Input
        id="fullName"
        label="نام و نام خانوادگی"
        placeholder="نام و نام خانوادگی خود را وارد کنید"
        {...register("fullName")}
        error={errors.fullName}
      />

      <Input
        id="email"
        label="ایمیل"
        placeholder="ایمیل خود را وارد کنید"
        {...register("email")}
        error={errors.email}
      />
    </div>
    <Button type="submit" loading={isSubmitting}>
      {isSubmitting ? "در حال ذخیره" : "ذخیره مرحله بعدی"}
    </Button>
  </form>
  )}

export default StepOne;
