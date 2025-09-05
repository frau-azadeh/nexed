import {
  EventMiniFinalFormValue,
  EventMiniFinalSchema,
} from "@/validation/event-mini.final";
import { EventMiniStep1FormValue } from "@/validation/event-mini.step1";
import { EventMiniStep2FormValue } from "@/validation/event-mini.step2";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  s1: EventMiniStep1FormValue;
  s2: EventMiniStep2FormValue;
  onBack: () => void;
  onDone: () => void;
};

const Step3: React.FC<Props> = ({ s1, s2, onBack, onDone }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventMiniFinalFormValue>({
    resolver: zodResolver(EventMiniFinalSchema),
    mode: "onTouched",
    defaultValues: { confirm: false },
  });

  const submitRequest = (data: EventMiniFinalFormValue) =>
    new Promise<EventMiniFinalFormValue>((resolve) => {
      setTimeout(() => resolve(data), 800);
    });

  const onSubmit = async (data: EventMiniFinalFormValue) => {
    await toast.promise(submitRequest(data), {
      loading: "در حال ارسال ...",
      success: "ثبت نام انجام شد",
      error: "ارسال ناموفق",
    });
    onDone();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md rounded-2xl bg-white/90 p-6 shadow-md"
    >
      <h3 className="mb-3 text-lg font-bold">مرحله ۳: مرور و تأیید</h3>

      {/* خلاصه اطلاعات */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="rounded-md border bg-gray-50 p-3">
          <p className="font-semibold">اطلاعات تماس</p>
          <p>نام: {s1.fullName}</p>
          <p>ایمیل: {s1.email}</p>
        </div>

        <div className="rounded-md border bg-gray-50 p-3">
          <p className="font-semibold">نوع حضور</p>
          <p>نحوه حضور: {s2.attendance === "inPerson" ? "حضوری" : "آنلاین"}</p>
          {s2.attendance === "inPerson" && <p>شهر: {s2.city}</p>}
          {s2.attendance === "online" && s2.platform && (
            <p>پلتفرم: {s2.platform === "zoom" ? "Zoom" : "Google Meet"}</p>
          )}
        </div>
      </div>

      {/* تأیید نهایی */}
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
              اطلاعات بالا را بررسی کردم و تأیید می‌کنم.
            </label>
          )}
        />
        {errors.confirm && (
          <p className="mt-1 text-xs text-red-600">{errors.confirm.message}</p>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm"
        >
          قبلی
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-5 text-sm text-white disabled:opacity-50"
        >
          {isSubmitting ? "در حال ارسال…" : "ارسال نهایی"}
        </button>
      </div>
    </form>
  );
};

export default Step3;
