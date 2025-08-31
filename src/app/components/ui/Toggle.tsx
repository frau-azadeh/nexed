"use client";
import React from "react";
import clsx from "clsx";

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, label, disabled }: ToggleProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-11 items-center rounded-full transition",
          checked ? "bg-emerald-600" : "bg-gray-300",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        aria-pressed={checked}
      >
        <span
          className={clsx(
            "inline-block h-5 w-5 transform rounded-full bg-white transition",
            checked ? "translate-x-5" : "translate-x-1"
          )}
        />
      </button>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </div>
  );
}
