
import { Step1FormValue, Step1Schema } from "@/validation/wizard.step1.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../ui/Button";

type Props = {
  onNext?: (data: Step1FormValue) => void;
};

const StepOne: React.FC<Props> = ({ onNext }) => {
  const {
    handleSubmit,
    control,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Step1FormValue>({
    resolver: zodResolver(Step1Schema),
    mode: "onTouched",
    defaultValues: { accept: false },
  });

  const validateAndNext = async () => {
    const ok = await trigger();
    if (!ok) {
      toast.error(errors.accept?.message ?? "لطفا قوانین را بپذیرید");
      return;
    }
    toast.success("پذیرفته شده ، مرحله بعدی");
    onNext?.(getValues());
  };

  const onError: SubmitErrorHandler<Step1FormValue> = () => {
    toast.error(errors.accept?.message ?? "لطفا قوانین را بپذیرید");
  };

  return (
    <form
      onSubmit={handleSubmit(validateAndNext, onError)}
      className="mx-auto max-w-2xl rounded-lg bg-white/90 p-6 shadow-md"
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold">مرحله 1 : قوانین و شرایط</h3>
        <p className="text-sm text-gray-700">
          برای ادامه پذیرش قوانین الزامی است
        </p>
      </div>
      <div className="mb-2">
        <Controller
          name="accept"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
              پذیرش قوانین و شرایط
            </label>
          )}
        />
        {errors.accept && (
          <p className="mt-1 text-xs text-red-600">{errors.accept.message}</p>
        )}
      </div>
      <div className="mt-6">
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? "ادامه" : "در حال بررسی"}
        </Button>
      </div>
    </form>
  );
};

export default StepOne;
