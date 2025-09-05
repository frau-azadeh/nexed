"use client";

import { EventMiniStep1FormValue } from "@/validation/event-mini.step1";
import { useState } from "react";
import Step1 from "../components/event-mini/Step1";
import { EventMiniStep2FormValue } from "@/validation/event-mini.step2";
import Step2 from "../components/event-mini/Step2";

export default function EventMiniWizard() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [s1, setS1] = useState<EventMiniStep1FormValue | null>(null);
  const [s2, setS2] = useState<EventMiniStep2FormValue | null>(null)
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

      {step === 2 &&(
        <Step2
          {...(s2? {defaultValues:s2}:{})}
          onBack={()=>setStep(1)}
          onNext={(data)=>{
            setS2(data)
            setStep(3)
          }}
        />
      )}

    </main>
  );
}
