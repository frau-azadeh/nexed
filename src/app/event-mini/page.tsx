"use client";

import { EventMiniStep1FormValue } from "@/validation/event-mini.step1";
import { useState } from "react";
import Step1 from "../components/event-mini/step1";

export default function EventMiniWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [s1, setS1] = useState<EventMiniStep1FormValue | null>(null);

  return (
    <main className="p-6">
      {step === 1 && (
        <Step1
          {...(s1 ? { defaultValues: s1 } : {})}
          onNext={(data) => {
            setS1(data);
            setStep(2);
          }}
        />
      )}
    </main>
  );
}
