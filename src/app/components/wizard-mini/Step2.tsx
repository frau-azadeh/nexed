import {
  MiniStep2FormValue,
  MiniStep2Schema,
} from "@/validation/wizard-mini.step2";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";

type Props = {
  onBack: () => void;
  onNext: (data: MiniStep2FormValue) => void;
  defaultValues?: Partial<MiniStep2FormValue>;
};

const militaryOptions = [
  { label: "پایان خدمت", value: "completed" },
  { label: "معافیت", value: "exempted" },
  { label: "در حال انجام", value: "inProgress" },
];

const Step2: React.FC<Props> = ({ onBack, onNext, defaultValues }) => {
  const {
    register,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm<MiniStep2FormValue>({
    resolver: zodResolver(MiniStep2Schema),
    mode: "onTouched",
    defaultValues: { ...defaultValues },
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
    if (!ok) return;

    onNext({
      firstName: watch("firstName")!,
      lastName: watch("lastName")!,
      gender: watch("gender")!,
      militaryStatus: watch("militaryStatus"),
    });
  };

  const onError: SubmitErrorHandler<MiniStep2FormValue> = () => {};

  return (
    <form
      onSubmit={handleSubmit(() => void goNext(), onError)}
      className="mx-auto max-w-xl rounded-2xl bg-white/90 p-6 shadow-md"
    >
      <h3 className="mb-3 text-lg font-bold">مرحله 2 : اطلاعات هویتی</h3>
      <div className="grid grid-cols-1 gap-1">
        <div>
          <Input
            {...register("firstName")}
            id="firstName"
            placeholder="نام خود را وارد کنید"
            label="نام"
            error={errors.firstName}
          />

          <Input
            {...register("lastName")}
            id="lastName"
            error={errors.lastName}
            placeholder="نام خانوادگی خود را وارد کنید"
            label="نام و نام خانوادگی"
          />

          <div>
            <label className="mb-1 block text-sm text-gray-700">جنسیت</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-6 text-sm">
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
          </div>

          {gender === "male" && (
            <div>
              <Select
                {...register("militaryStatus")}
                options={militaryOptions}
                defaultValue=""
                id="militaryStatus"
                label="جنسیت"
                error={errors.militaryStatus}
                placeholder="انتخاب کنید"
              />
            </div>
          )}
        </div>

        <div>
          <Button type="button" onClick={onBack} variant="outline">
            قبلی
          </Button>

          <Button loading={isSubmitting} type="submit" variant="primary">
            {isSubmitting ? "در حال بررسی" : "مرحله بعدی"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Step2;
