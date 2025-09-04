"use client";

import { useState } from "react";
import Step1 from "../components/wizard-mini/Step1";
import { MiniStep1FormValue } from "@/validation/wizard.mini.step1";
import { MiniStep2FormValue } from "@/validation/wizard-mini.step2";
import Step2 from "../components/wizard-mini/Step2";

export default function WizardMini() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [s1, setS1] = useState<MiniStep1FormValue | null>(null);
  const [s2, setS2] = useState<MiniStep2FormValue | null>(null);
  return (
    <main className="p-6">
      {step === 1 && <Step1 onNext={() => setStep(2)} />}
      {step === 2 && (
        <Step2
          {...(s2 ? { defaultValues: s2 } : {})}
          onBack={() => setStep(1)}
          onNext={(data) => {
            setS2(data);
            setStep(2);
          }}
        />
      )}
    </main>
  );
}
