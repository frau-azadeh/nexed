"use client";

import { useState } from "react";
import StepOne from "../components/form/wizard/StepOne";
import { StepOneFormValue } from "@/validation/cinema.stepone.schema";
import { StepTwoFormValue } from "@/validation/cinema.steptwo.schema";
import StepTwo from "../components/form/wizard/StepTwo";
import StepThree from "../components/form/wizard/StepThree";

export default function Wizard() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [s1, setS1] = useState<StepOneFormValue | null>(null);
  const [s2, setS2] = useState<StepTwoFormValue | null>(null);

  return (
    <main className="p-6 space-y-6">
      {step === 0 && (
        <StepOne
          onNext={(data) => {
            setS1(data);
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <StepTwo
          defaultValues={s2 ?? undefined}
          onBack={() => setStep(0)}
          onNext={(data: StepTwoFormValue) => {
            setS2(data);
            setStep(2);
          }}
        />
      )}
      {step === 2 && s1 && s2 && (
        <StepThree
          step1={s1}
          step2={s2}
          onBack={() => setStep(1)}
          onSuccess={() => {
            setS1(null);
            setS2(null);
            setStep(0);
          }}
        />
      )}
    </main>
  );
}
