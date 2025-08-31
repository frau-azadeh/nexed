"use client";

import { ContactFormValue, ContactSchema } from "@/validation/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../ui/Input";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";
import Toggle from "../ui/Toggle";

const topicOptions = [
  { label: "پشتیبانی", value: "support" },
  { label: "فروش", value: "sales" },
  { label: "بازخورد", value: "feedback" },
  { label: "سایر", value: "other" },
];

const ContactForm = () => {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValue>({
    resolver: zodResolver(ContactSchema),
    mode: "onTouched",
    defaultValues: {
      sendCopy: false,
    },
  });

  const fullName = watch("fullName") ?? "";
  const topic = watch("topic") ?? "";
  const message = watch("message") ?? "";

  const submitRequest = (data: ContactFormValue) =>
    new Promise<ContactFormValue>((resolve) => {
      setTimeout(() => resolve(data), 800);
    });

  const onSubmit = async (data: ContactFormValue) => {
    await toast.promise(submitRequest(data), {
      loading: "در حال اتصال ...",
      success: "اطلاعات تکمیلی با موفقیت ثبت شد",
      error: "ارسال اطلاعات ناموفق بود",
    });
  };

  const topicLabel = topicOptions.find((t) => t.value === topic)?.label ?? "-";
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-2xl">
      <div className="rounded-2xl bg-white/80 p-6 shadow-md backdrop-blur">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">فرم تماس</h2>
          <p className="mt-1 text-sm text-gray-600">
            لطفاً اطلاعات تماس و پیام خود را وارد کنید.
          </p>
        </div>

        <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50/60 p-4 text-sm text-gray-700">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div>
              <span className="text-gray-500">نام فرستنده:</span>{" "}
              {fullName || "—"}
            </div>
            <div>
              <span className="text-gray-500">موضوع:</span> {topicLabel}
            </div>
            <div>
              <span className="text-gray-500">طول پیام:</span>
              {message?.length}/500
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            id="fullName"
            label="نام خانوادگی"
            placeholder="نام خانوادگی خود را وارد کنید"
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

          <Input
            id="phone"
            label="شماره همراه"
            placeholder="شماره همراه خود را وارد کنید"
            inputMode="numeric"
            {...register("phone")}
            error={errors.phone}
          />

          <Select
            id="topic"
            label="موضوع پیام"
            placeholder="انتخاب کنید ..."
            defaultValue=""
            {...register("topic")}
            error={errors.topic}
            options={topicOptions}
          />

          <Input
            id="subject"
            label="عنوان"
            placeholder="یک عنوان انتخاب نمایید"
            {...register("subject")}
            error={errors.subject}
            className="md:col-span-2"
          />

          <TextArea
            id="message"
            label="متن پیام"
            rows={5}
            placeholder="پیام خود را بنویسید…"
            {...register("message")}
            error={errors.message}
            className="md:col-span-2"
            helperText="حداکثر ۵۰۰ کاراکتر"
          />
        </div>

        <div>
          <Controller
            name="sendCopy"
            control={control}
            render={({ field }) => (
              <Toggle
                checked={Boolean(field.value)}
                onChange={(v) => field.onChange(v)}
                label="یک نسخه از پیام برای من ایمیل شود"
              />
            )}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={isSubmitting}
        >
          {isSubmitting ? "ارسال" : "درحال ارسال ..."}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
