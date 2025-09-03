import { Step3FormValue, Step3Schema } from "@/validation/wizard.step3.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

type Props = {
  onNext?: (data: Step3FormValue) => void;
  onBack?: () => void;
  defaultValues?: Partial<Step3FormValue>;
};

const StepThree: React.FC<Props> = ({ onNext, onBack, defaultValues }) => {
  const {
    control,
    trigger,
    setValue,
    handleSubmit,
    watch,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Step3FormValue>({
    resolver: zodResolver(Step3Schema),
    mode: "onTouched",
    defaultValues: { ...defaultValues },
  });
  const marital = watch("maritalStatus");

  useEffect(() => {
    if (marital === "single") {
      setValue("childrenCount", undefined);
      void trigger("childrenCount");
    }
  }, [marital, setValue, trigger]);

  const goNext = async () => {
    const ok = await trigger();
    if (!ok) {
      const first = errors.maritalStatus ?? errors.childrenCount;
      toast.error(first?.message ?? "لطفا خطای این مرحله را بررسی کنید");
      return;
    }
    onNext?.({
      maritalStatus: watch("maritalStatus")!,
      childrenCount: watch("childrenCount"),
    });
  };

  const onError: SubmitErrorHandler<Step3FormValue> = () => {
    toast.error("لطفا خطاهای این مرحله را برطرف کنید");
  };
  return (
    <form
      onSubmit={handleSubmit(() => void goNext(), onError)}
      className="mx-auto max-w-xl rounded-2xl bg-white/90 p-6 shadow-md"
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold">مرحله 3 : وضعیت تاهل</h3>
        <p className="text-sm text-gray-700">
          {" "}
          وضعیت تأهل خود را مشخص کنید. اگر متأهل هستید، تعداد فرزند را وارد
          کنید.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            وضعیت تاهل
          </label>
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="single"
                    checked={field.value === "single"}
                    onChange={() => field.onChange("single")}
                  />
                  مجرد
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="married"
                    checked={field.value === "married"}
                    onChange={() => field.onChange("married")}
                  />
                  متاهل
                </label>
              </div>
            )}
          />
          {errors.maritalStatus && (
            <p className="mt-1 text-sm text-red-600">
              {errors.maritalStatus.message}
            </p>
          )}
        </div>

        {marital === "married" && (
          <div>
            <Input
              id="childrenCount"
              type="number"
              inputMode="numeric"
              min={0}
              max={10}
              label="تعداد فرزندان"
              placeholder="تعداد فرزاندان خود را وارد کنید"
              {...register("childrenCount")}
              error={errors.childrenCount}
              className="md:col-span-2"
            />
          </div>
        )}
      </div>
      <div className="mt-6 flex items-center gap-3">
        <Button 
            type="button" variant="outline" onClick={onBack}
        >
            قبلی
        </Button>
        <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? "در حال بررسی ...":"ادامه"}
        </Button>
      </div>
    </form>
  );
};

export default StepThree;
