"use client"

import { Step1FormValue } from "@/validation/wizard.step1.schema";
import { useState } from "react";
import StepOne from "../components/form/wizard2/StepOne";

export default function Wizard2() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [s1, setS1] = useState<Step1FormValue | null>(null);

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
    </main>
  );
}
