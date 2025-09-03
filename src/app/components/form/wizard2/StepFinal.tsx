import {
  FinalConfirmFormValue,
  FinalConfirmSchema,
} from "@/validation/wizard.final.schema";
import { Step1FormValue } from "@/validation/wizard.step1.schema";
import { Step2FormValue } from "@/validation/wizard.step2.schema";
import { Step3FormValue } from "@/validation/wizard.step3.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../ui/Button";

type Props = {
  onBack?: () => void;
  onSubmitted?: () => void;
  s1: Step1FormValue;
  s2: Step2FormValue;
  s3: Step3FormValue;
};

const StepFinal: React.FC<Props> = ({ onBack, onSubmitted, s1, s2, s3 }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FinalConfirmFormValue>({
    resolver: zodResolver(FinalConfirmSchema),
    mode: "onTouched",
    defaultValues: { accept: false },
  });

  const submitRequest = (data: FinalConfirmFormValue) =>
    new Promise<FinalConfirmFormValue>((resolve) => {
      setTimeout(() => resolve(data), 800);
    });

  const onSubmit = async (data: FinalConfirmFormValue) => {
    await toast.promise(submitRequest(data), {
      loading: "در حال ارسال ...",
      success: "اطلاعات با موفقیت ثبت شد",
      error: "ارسال اطلاعات ناموفق بود",
    });
  };

  const onError: SubmitErrorHandler<FinalConfirmFormValue> = () => {
    toast.error(errors.accept?.message ?? "لطفا خطا ها را برطرف کنید");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-white/90 p-6 shadow-md"
    >
      <div className="border-b pb-3">
        <h3 className="text-lg font-bold">مرحله 4 : مرور و تایید</h3>
        <p className="text-sm text-gray-600">
          لطفا اطلاعات خود را بررسی نمایید
        </p>
      </div>

      <section className="rounded-xl border bg-gray-50/70 p-4">
        <h4 className="mb-2 font-medium">مرحله 1 : پذیرش قوانین</h4>
        <ul className="text-sm text-gray-700">
          <li>قوانین پذیرفته شد</li>
        </ul>
      </section>

      <section>
        <h4>مرحله 2 : اطلاعات هویتی</h4>
        <ul>
          <li>
            <span>نام : {s2.firstName}</span>
          </li>
          <li>
            <span>نام خانوادگی : {s2.lastName}</span>
          </li>
          <li>
            <span>جنسیت : {s2.gender === "male" ? "مرد" : "زن"}</span>
          </li>
          {s2.gender === "male" && (
            <li>
              <span className="text-gray-500">
                وضعیت سربازی
                {s2.militaryStatus === "completed"
                  ? "پایان خدمت"
                  : s2.militaryStatus === "exempted"
                    ? "معافیت"
                    : s2.militaryStatus === "inProgress"
                      ? "در حال انجام"
                      : "_"}
              </span>
            </li>
          )}
        </ul>
      </section>

      <section className="rounded-xl border bg-gray-50/70 p-4">
        <h4 className="mb-2 font-semibold">مرحله ۳: وضعیت تأهل</h4>
        <ul className="grid grid-cols-1 gap-2 text-sm text-gray-700 md:grid-cols-2">
          <li>
            <span className="text-gray-500">وضعیت: </span>
            {s3.maritalStatus === "married" ? "متأهل" : "مجرد"}
          </li>
          {s3.maritalStatus === "married" && (
            <li>
              <span className="text-gray-500">تعداد فرزند: </span>
              {s3.childrenCount ?? 0}
            </li>
          )}
        </ul>
      </section>
      <div className="rounded-xl border bg-gray-50/70 p-4">
        <Controller
          name="accept"
          control={control}
          render={({ field }) => (
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              محتوای فوق را بررسی کرده و پذیرفتم.
            </label>
          )}
        />
        {errors.accept && (
          <p className="mt-1 text-sm text-red-600">{errors.accept.message}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          قبلی
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? "در حال ارسال ..." : "ارسال نهایی"}
        </Button>
      </div>
    </form>
  );
};

export default StepFinal;
