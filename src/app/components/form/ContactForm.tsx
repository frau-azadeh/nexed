"use client";

import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, type FieldErrors, useForm } from "react-hook-form";

import { ContactFormValue, ContactSchema } from "@/validation/contact.schema";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import TextArea from "../ui/TextArea";
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
    trigger, // 👈 اضافه شد
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValue>({
    resolver: zodResolver(ContactSchema),
    mode: "onTouched",
    criteriaMode: "all",
    shouldFocusError: true,
    defaultValues: {
      sendCopy: false,
      fullName: "",
      topic: undefined,
      message: "",
    },
  });

  const fullName = watch("fullName") ?? "";
  const topic = watch("topic") ?? "";
  const message = watch("message") ?? "";

  // ❷ اعتبارسنجی شرطی: اگر موضوع «پشتیبانی» شد، عنوان را دوباره چک کن
  useEffect(() => {
    if (topic === "support") {
      void trigger("subject");
    }
  }, [topic, trigger]);

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

  const onError = (errs: FieldErrors<ContactFormValue>) => {
    const first = Object.values(errs)[0];
    toast.error(first?.message ?? "لطفاً خطاهای فرم را برطرف کنید");
  };

  const topicLabel = topicOptions.find((t) => t.value === topic)?.label ?? "-";
  const emailReg = register("email");
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="mx-auto mt-8 max-w-2xl"
      dir="rtl"
    >
      <div className="rounded-2xl bg-white/80 p-6 shadow-md backdrop-blur">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">فرم تماس</h2>
          <p className="mt-1 text-sm text-gray-600">
            لطفاً اطلاعات تماس و پیام خود را وارد کنید.
          </p>
        </div>

        {/* Preview با watch */}
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
              <span className="text-gray-500">طول پیام:</span> {message.length}
              /500
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            id="fullName"
            label="نام و نام خانوادگی"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            {...register("fullName")}
            error={errors.fullName}
          />

          {/* ❶ بررسی دستی ایمیل با trigger روی دکمهٔ کنار ورودی */}
          <div className="flex items-end gap-2 md:col-span-1">
            <div className="flex-1">
              <Input
                id="email"
                label="ایمیل"
                placeholder="ایمیل خود را وارد کنید"
                {...emailReg}
                onBlur={async (e) => {
                  emailReg.onBlur(e); // اول onBlur اصلی RHF
                  await trigger("email"); // بعد trigger دستی
                }}
                error={errors.email}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                const ok = await trigger("email");
                toast[ok ? "success" : "error"](
                  ok ? "ایمیل معتبر است" : "ایمیل نامعتبر است",
                );
              }}
            >
              بررسی ایمیل
            </Button>
          </div>

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
            label={`عنوان ${topic === "support" ? "(برای پشتیبانی اجباری)" : "(اختیاری)"}`}
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

        <div className="mt-4 md:col-span-2">
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
          {errors.sendCopy && (
            <p className="text-xs text-red-600">{errors.sendCopy.message}</p>
          )}
        </div>

        {/* دکمه‌هایی برای trigger نمونه‌ای */}
        <div className="mt-6 flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={async () => {
              // چند فیلد مهم را یکجا چک کن
              const ok = await trigger(["fullName", "email", "message"]);
              toast[ok ? "success" : "error"](
                ok ? "موارد اصلی معتبر هستند" : "برخی فیلدها نامعتبرند",
              );
            }}
          >
            بررسی سریع
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={isSubmitting}
          >
            {isSubmitting ? "در حال ارسال ..." : "ارسال"}
          </Button>

          {isSubmitSuccessful && (
            <span className="text-xs text-emerald-600">با موفقیت ثبت شد</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
