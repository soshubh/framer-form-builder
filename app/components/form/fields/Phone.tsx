import { useEffect, useRef, useState } from "react";

import { Shell } from "./Shell";
import type { FormFieldComponentProps } from "../types";

export function Phone({ field }: FormFieldComponentProps) {
  const [countryCode, setCountryCode] = useState(field.phoneCountryCode ?? "+91");
  const [value, setValue] = useState("");
  const [isCodeMenuOpen, setIsCodeMenuOpen] = useState(false);
  const codeMenuRef = useRef<HTMLDivElement | null>(null);
  const countryCodeMode = field.phoneCountryCodeMode ?? "fixed";
  const countryCodeOptions = field.phoneCountryCodeOptions ?? ["+1", "+44", "+61", "+91"];

  useEffect(() => {
    if (!isCodeMenuOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!codeMenuRef.current?.contains(event.target as Node)) {
        setIsCodeMenuOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isCodeMenuOpen]);

  return (
    <Shell
      label={field.label}
      isRequired={field.required}
      requiredMessage={field.validationMessage}
      isLabelVisible={field.isLabelVisible}
      isRequiredVisible={field.isRequiredVisible}
      isHelperTextVisible={field.isHelperTextVisible}
    >
      <div className="form-element-phone-layout">
        {countryCodeMode === "dropdown" ? (
          <div
            ref={codeMenuRef}
            className={`form-element-phone-code-control${isCodeMenuOpen ? " is-open" : ""}`}
          >
            <button
              type="button"
              className="form-element-phone-code-trigger"
              onClick={() => setIsCodeMenuOpen((current) => !current)}
            >
              <div className="form-element-visual-surface">
                <span className="form-element-visual-text form-element-phone-code-text">
                  {countryCode}
                </span>
                <span className="form-element-visual-trailing">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M7 10L12 15L17 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </button>
            {isCodeMenuOpen ? (
              <div className="form-element-phone-code-menu">
                {countryCodeOptions.map((option, index) => (
                  <button
                    key={`${option}-${index}`}
                    type="button"
                    className={`form-element-phone-code-option${
                      option === countryCode ? " is-active" : ""
                    }`}
                    onClick={() => {
                      setCountryCode(option);
                      setIsCodeMenuOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="form-element-visual-surface form-element-phone-code-static">
            <span className="form-element-visual-text form-element-phone-code-text">
              {countryCode}
            </span>
          </div>
        )}

        <div className="form-element-visual-control form-element-phone-number-control">
          <div
            className={`form-element-visual-surface${value ? "" : " is-placeholder"}`}
            aria-hidden="true"
          >
            <span className="form-element-visual-text">
              {value || field.placeholder || "\u00A0"}
            </span>
          </div>
          <input
            className="form-element-native-control"
            type="tel"
            value={value}
            onChange={(event) => setValue(event.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder=""
          />
        </div>
      </div>
    </Shell>
  );
}
