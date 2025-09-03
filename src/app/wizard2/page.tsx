"use client";

import { Step1FormValue } from "@/validation/wizard.step1.schema";
import { useState } from "react";
import StepOne from "../components/form/wizard2/StepOne";
import { Step2FormValue } from "@/validation/wizard.step2.schema";
import StepTwo from "../components/form/wizard2/StepTwo";
import { Step3FormValue } from "@/validation/wizard.step3.schema";
import StepThree from "../components/form/wizard2/StepThree";

export default function Wizard2() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [s1, setS1] = useState<Step1FormValue | null>(null);
  const [s2, setS2] = useState<Step2FormValue | null>(null);
  const [s3, setS3] = useState<Step3FormValue | null>(null)

  return (
    <main className="p-6">
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
          // ⬇️ فقط اگر s2 موجود است defaultValues را پاس بده
          {...(s2 ? { defaultValues: s2 } : {})}
          onBack={() => setStep(0)}
          onNext={(data: Step2FormValue) => {
            setS2(data);
            setStep(2);
          }}
        />
      )}

      {step === 2 &&(
        <StepThree
          {...(s3 ? {defaultValues: s3}:{})}
          onBack={()=> setStep(1)}
          onNext={(data)=>{
            setS3(data);
            setStep(3);
          }}
        />
      )}
    </main>
  );
}
