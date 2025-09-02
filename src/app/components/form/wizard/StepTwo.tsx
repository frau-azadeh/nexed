import { StepOneFormValue } from "@/validation/cinema.stepone.schema";
import {
  StepTwoFormValue,
  StepTwoSchema,
} from "@/validation/cinema.steptwo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

const movieOptions = [
  { label: "Dune 2", value: "dune2" },
  { label: "Oppenheimer", value: "oppenheimer" },
  { label: "Inside out 2", value: "insideout2" },
];

const showtimeOptions = [
  { label: "18:00", value: "18:00" },
  { label: "۲۰:۰۰", value: "20:00" },
  { label: "۲۲:۰۰", value: "22:00" },
];

const seatTypeOptions = [
  { label: "معمولی", value: "normal" },
  { label: "VIP", value: "vip" },
];

const PRICE: Record<"normal" | "vip", number> = {
  normal: 250_000,
  vip: 400_000,
};

type Props = {
  onNext?: (data: StepTwoFormValue) => void;
  onBack?: () => void;
  defaultValues?: Partial<StepTwoFormValue>;
};

const StepTwo: React.FC<Props> = ({ onNext, onBack, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    getValues,
    trigger,
  } = useForm<StepTwoFormValue>({
    resolver: zodResolver(StepTwoSchema),
    mode: "onTouched",
    defaultValues: { seatType: "normal", quantity: 1, ...defaultValues },
  });

  const seatType = (watch("seatType") ?? "normal") as "normal" | "vip";
  const qty = Number(watch("quantity") ?? 0);
  const total = useMemo(() => PRICE[seatType] * (qty || 0), [seatType, qty]);

  const validateAndNext = async () => {
    const ok = await trigger();
    if (!ok) {
      toast.error("لطفا خطای این مرحله را رفع نمایید");
      return;
    }
    onNext?.(getValues());
  };

  return (
    <form
      onSubmit={handleSubmit(() => validateAndNext())}
      className="mx-auto max-w-xl rounded-2xl bg-white/80 p-6 shadow-md"
    >
      <div className="mb-4">
        <h3 className="text-lg font-bold">مرحله دوم : انتخاب بلیط</h3>
        <p className="text-sm text-gray-700">
          فیلم، سانس و تعداد بلیط خود را انتخاب کنید
        </p>
      </div>
      <div className="mb-4 rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <span>نوع صندلی: {seatType === "vip" ? "VIP" : "معمولی"}</span>
          <span>تعداد: {qty}</span>
          <span>جمع کل : {total.toLocaleString("fa-IR")}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            id="movie"
            label="فیلم"
            placeholder="انتخاب کنید…"
            defaultValue=""
            options={movieOptions}
            {...register("movie")}
            error={errors.movie}
          />
          <Select
            id="showtime"
            label="سانس"
            placeholder="انتخاب کنید…"
            defaultValue=""
            options={showtimeOptions}
            {...register("showtime")}
            error={errors.showtime}
          />

          <Select
            id="seatType"
            label="نوع صندلی"
            placeholder="انتخاب کنید"
            defaultValue=""
            options={seatTypeOptions}
            {...register("seatType")}
            error={errors.seatType}
          />

          <Input
            id="quantity"
            type="number"
            inputMode="numeric"
            min={1}
            max={6}
            label="تعداد بلیط"
            {...register("quantity")}
            error={errors.quantity}
          />
        </div>
      </div>

      <div>
        <Button type="button" variant="outline" onClick={onBack}>
          قبلی
        </Button>
        <Button type="button" onClick={validateAndNext} loading={isSubmitting}>
          {isSubmitting ? "رفتن به مرحله بعدی" : "در حال بررسی ..."}
        </Button>
      </div>
    </form>
  );
};

export default StepTwo;
