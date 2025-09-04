// src/app/wizard-mini/page.tsx
"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Step1 from "@/app/components/wizard-mini/Step1";
import Step2 from "@/app/components/wizard-mini/Step2";
import Step3 from "@/app/components/wizard-mini/Step3";
import type { MiniStep1FormValue } from "@/validation/wizard.mini.step1";
import type { MiniStep2FormValue } from "@/validation/wizard-mini.step2";

export default function WizardMini() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [s1, setS1] = useState<MiniStep1FormValue | null>(null);
  const [s2, setS2] = useState<MiniStep2FormValue | null>(null);

  return (
    <main className="p-6">
      <Toaster position="top-center" />
      {step === 1 && (
        <Step1
          onNext={(data) => {
            setS1(data);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <Step2
          {...(s2 ? { defaultValues: s2 } : {})}
          onBack={() => setStep(1)}
          onNext={(data) => {
            setS2(data);
            setStep(3);
          }}
        />
      )}
      {step === 3 && s1 && s2 && (
        <Step3
          s1={s1}
          s2={s2}
          onBack={() => setStep(2)}
          onDone={() => {
            setStep(1);
            setS1(null);
            setS2(null);
          }}
        />
      )}
    </main>
  );
}
