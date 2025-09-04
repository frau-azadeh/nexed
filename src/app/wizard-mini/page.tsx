"use client";

import { useState } from "react";
import Step1 from "../components/wizard-mini/Step1";

export default function WizardMini() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  return (
    <main className="p-6">
      {step === 1 && <Step1 onNext={() => setStep(2)} />}
    </main>
  );
}
