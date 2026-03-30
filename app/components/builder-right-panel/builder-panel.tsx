"use client";

import { useEffect, useState } from "react";

import { ButtonTypeIcon, FieldTypeIcon } from "../builder-item-icon";
import type {
  FormActionButton,
  FormButtonIcon,
  FormButtonType,
} from "../form/button/types";
import type { Field, FieldType, PhoneCountryCodeMode, WidthOption } from "../form/types";
import {
  getButtonPaddingValues,
  getButtonWidthForPreview,
  getFieldWidthForPreview,
  type PreviewMode,
  type StylingValues,
} from "../../lib/builder-config";
import { BUTTON_ICON_OPTIONS } from "../../lib/button-icons";
import {
  BUTTON_TYPE_OPTIONS,
  FIELD_TYPE_OPTIONS,
  getButtonTypeLabel,
  getFieldTypeLabel,
} from "../../lib/field-ui";
import {
  ColorInputRow,
  ConfigInput,
  InspectorCard,
  InspectorShell,
  SelectRow,
  TextareaRow,
  TextInputRow,
  ToggleRow,
} from "./inspector-primitives";
import { ItemLayoutCard } from "./item-layout-card";
import type { RightPanelTab } from "./types";
import { SystemButton } from "../system-button";

function SplitToggleAllIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="2.25"
        y="2.25"
        width="11.5"
        height="11.5"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SplitToggleSplitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M5 2.75H3.75C3.198 2.75 2.75 3.198 2.75 3.75V5M11 2.75H12.25C12.802 2.75 13.25 3.198 13.25 3.75V5M13.25 11V12.25C13.25 12.802 12.802 13.25 12.25 13.25H11M5 13.25H3.75C3.198 13.25 2.75 12.802 2.75 12.25V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="6.25" y="6.25" width="3.5" height="3.5" rx="1" fill="currentColor" />
    </svg>
  );
}

function SplitValueRow({
  label,
  mode,
  allValue,
  max,
  labels,
  values,
  onAllChange,
  onUseAll,
  onUseIndividual,
  onValueChange,
}: {
  label: string;
  mode: "all" | "individual";
  allValue: number;
  max: number;
  labels: [string, string, string, string];
  values: [number, number, number, number];
  onAllChange: (value: number) => void;
  onUseAll: () => void;
  onUseIndividual: () => void;
  onValueChange: (index: number, value: number) => void;
}) {
  const isIndividual = mode === "individual";

  return (
    <>
      <div className="builder-app-config-row">
        <span className="builder-app-config-row-label">{label}</span>
        <div className="builder-app-config-padding-inline">
          <ConfigInput
            className="builder-app-config-padding-main-input"
            type="number"
            min={0}
            max={max}
            value={isIndividual ? "" : allValue}
            onChange={(event) => onAllChange(Number(event.target.value || 0))}
          />
          <div className="builder-app-config-padding-toggle">
            <SystemButton
              variant="segment"
              size="sm"
              active={!isIndividual}
              className="builder-app-config-padding-toggle-button"
              onClick={onUseAll}
            >
              <SplitToggleAllIcon />
            </SystemButton>
            <SystemButton
              variant="segment"
              size="sm"
              active={isIndividual}
              className="builder-app-config-padding-toggle-button"
              onClick={onUseIndividual}
            >
              <SplitToggleSplitIcon />
            </SystemButton>
          </div>
        </div>
      </div>

      {isIndividual ? (
        <div className="builder-app-config-row builder-app-config-row--padding-sides">
          <span className="builder-app-config-row-label" aria-hidden="true">
            &nbsp;
          </span>
          <div className="builder-app-config-padding-sides">
            <div className="builder-app-config-padding-sides-inputs">
              {values.map((value, index) => (
                <ConfigInput
                  key={labels[index]}
                  className="builder-app-config-padding-side-input"
                  type="number"
                  min={0}
                  max={max}
                  value={value}
                  onChange={(event) => onValueChange(index, Number(event.target.value || 0))}
                />
              ))}
            </div>
            <div className="builder-app-config-padding-sides-labels" aria-hidden="true">
              {labels.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function FieldOptionsTextarea({
  field,
  onFieldUpdate,
}: {
  field: Field;
  onFieldUpdate: <K extends keyof Field>(id: string, key: K, value: Field[K]) => void;
}) {
  const [draftValue, setDraftValue] = useState((field.options ?? []).join("\n"));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setDraftValue((field.options ?? []).join("\n"));
    }
  }, [field.id, field.options, isEditing]);

  const commitOptions = (value: string) => {
    onFieldUpdate(
      field.id,
      "options",
      value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    );
  };

  return (
    <TextareaRow
      label="Options"
      rows={4}
      value={draftValue}
      onFocus={() => setIsEditing(true)}
      onChange={(event) => {
        const nextValue = event.target.value;
        setDraftValue(nextValue);
        commitOptions(nextValue);
      }}
      onBlur={(event) => {
        setIsEditing(false);
        commitOptions(event.target.value);
      }}
    />
  );
}

function PhoneCountryCodeOptionsTextarea({
  field,
  onFieldUpdate,
}: {
  field: Field;
  onFieldUpdate: <K extends keyof Field>(id: string, key: K, value: Field[K]) => void;
}) {
  const [draftValue, setDraftValue] = useState((field.phoneCountryCodeOptions ?? []).join("\n"));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setDraftValue((field.phoneCountryCodeOptions ?? []).join("\n"));
    }
  }, [field.id, field.phoneCountryCodeOptions, isEditing]);

  const commitOptions = (value: string) => {
    onFieldUpdate(
      field.id,
      "phoneCountryCodeOptions",
      value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    );
  };

  return (
    <TextareaRow
      label="Country code options"
      rows={4}
      value={draftValue}
      onFocus={() => setIsEditing(true)}
      onChange={(event) => {
        const nextValue = event.target.value;
        setDraftValue(nextValue);
        commitOptions(nextValue);
      }}
      onBlur={(event) => {
        setIsEditing(false);
        commitOptions(event.target.value);
      }}
    />
  );
}

function FieldConfigPanel({
  field,
  previewMode,
  onFieldUpdate,
  onFieldTypeChange,
  onFieldWidthSet,
}: {
  field: Field;
  previewMode: PreviewMode;
  onFieldUpdate: <K extends keyof Field>(id: string, key: K, value: Field[K]) => void;
  onFieldTypeChange: (id: string, type: FieldType) => void;
  onFieldWidthSet: (id: string, width: WidthOption) => void;
}) {
  const currentWidth = getFieldWidthForPreview(field, previewMode);
  const handleRequiredChange = (checked: boolean) => {
    onFieldUpdate(field.id, "required", checked);
    onFieldUpdate(field.id, "isRequiredVisible", checked);
  };

  return (
    <InspectorShell
      titleClassName="builder-app-field-config-title"
      title={
        <>
          <div className="builder-app-field-config-icon">
            <FieldTypeIcon type={field.type} />
          </div>
          <span>{field.label}</span>
        </>
      }
      badge={getFieldTypeLabel(field.type)}
    >
      <InspectorCard title="Basic">
        <SelectRow
          label="Type"
          value={field.type}
          onChange={(event) => onFieldTypeChange(field.id, event.target.value as FieldType)}
        >
          {FIELD_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectRow>
        <TextInputRow
          label="Label"
          value={field.label}
          onChange={(event) => onFieldUpdate(field.id, "label", event.target.value)}
        />
        {field.type !== "checkbox" ? (
          <TextInputRow
            label="Placeholder"
            value={field.placeholder ?? ""}
            onChange={(event) => onFieldUpdate(field.id, "placeholder", event.target.value)}
          />
        ) : null}
        <TextInputRow
          label="Error message"
          value={field.validationMessage ?? ""}
          onChange={(event) => onFieldUpdate(field.id, "validationMessage", event.target.value)}
        />
        {field.type === "select" || field.type === "radio" || field.type === "checkbox" ? (
          <FieldOptionsTextarea field={field} onFieldUpdate={onFieldUpdate} />
        ) : null}
        {field.type === "phone" ? (
          <>
            <SelectRow
              label="Country code"
              value={field.phoneCountryCodeMode ?? "fixed"}
              onChange={(event) =>
                onFieldUpdate(
                  field.id,
                  "phoneCountryCodeMode",
                  event.target.value as PhoneCountryCodeMode,
                )
              }
            >
              <option value="fixed">Fixed value</option>
              <option value="dropdown">Dropdown</option>
            </SelectRow>
            <TextInputRow
              label={field.phoneCountryCodeMode === "dropdown" ? "Default code" : "Country code"}
              value={field.phoneCountryCode ?? "+91"}
              onChange={(event) => onFieldUpdate(field.id, "phoneCountryCode", event.target.value)}
            />
            {field.phoneCountryCodeMode === "dropdown" ? (
              <PhoneCountryCodeOptionsTextarea field={field} onFieldUpdate={onFieldUpdate} />
            ) : null}
          </>
        ) : null}
      </InspectorCard>

      <InspectorCard title="Visibility">
        <ToggleRow
          label="Required"
          checked={field.required}
          onChange={handleRequiredChange}
        />
        <ToggleRow
          label="Show label"
          checked={field.isLabelVisible ?? true}
          onChange={(checked) => onFieldUpdate(field.id, "isLabelVisible", checked)}
        />
        {field.required ? (
          <ToggleRow
            label="Show required *"
            checked={field.isRequiredVisible ?? true}
            onChange={(checked) => onFieldUpdate(field.id, "isRequiredVisible", checked)}
          />
        ) : null}
        <ToggleRow
          label="Show helper text"
          checked={field.isHelperTextVisible ?? true}
          onChange={(checked) => onFieldUpdate(field.id, "isHelperTextVisible", checked)}
        />
      </InspectorCard>

      <ItemLayoutCard
        previewMode={previewMode}
        width={currentWidth}
        onWidthChange={(value) => onFieldWidthSet(field.id, value)}
      />

    </InspectorShell>
  );
}

function ButtonConfigPanel({
  button,
  previewMode,
  styling,
  onButtonUpdate,
  onButtonTypeChange,
  onButtonWidthSet,
}: {
  button: FormActionButton;
  previewMode: PreviewMode;
  styling: StylingValues;
  onButtonUpdate: <K extends keyof FormActionButton>(
    id: string,
    key: K,
    value: FormActionButton[K],
  ) => void;
  onButtonTypeChange: (id: string, type: FormButtonType) => void;
  onButtonWidthSet: (id: string, width: WidthOption) => void;
}) {
  const currentWidth = getButtonWidthForPreview(button, previewMode);
  const defaultPadding = getButtonPaddingValues(styling);
  const effectivePaddingMode = button.paddingMode ?? styling.buttonPaddingMode;
  const effectivePadding =
    typeof button.padding === "number" ? button.padding : styling.buttonPadding;
  const effectivePaddingTop = button.paddingTop ?? defaultPadding.top;
  const effectivePaddingRight = button.paddingRight ?? defaultPadding.right;
  const effectivePaddingBottom = button.paddingBottom ?? defaultPadding.bottom;
  const effectivePaddingLeft = button.paddingLeft ?? defaultPadding.left;
  const effectiveVariant = button.variant ?? styling.buttonStyle;
  const effectiveRadiusMode = button.radiusMode ?? "all";
  const effectiveRadius = button.radius ?? styling.buttonRadius;
  const effectiveRadiusTopLeft = button.radiusTopLeft ?? styling.buttonRadius;
  const effectiveRadiusTopRight = button.radiusTopRight ?? styling.buttonRadius;
  const effectiveRadiusBottomRight = button.radiusBottomRight ?? styling.buttonRadius;
  const effectiveRadiusBottomLeft = button.radiusBottomLeft ?? styling.buttonRadius;
  const effectiveBorderWidth = button.borderWidth ?? styling.buttonBorderWidth;
  const effectiveTextSize = button.textSize ?? styling.buttonTextSize;
  const effectiveTextWeight = button.textWeight ?? styling.buttonTextWeight;
  const effectiveFillColor = button.fillColor ?? styling.primaryColor;
  const effectiveBorderColor = button.borderColor ?? styling.buttonBorderColor;
  const effectiveTextColor = button.textColor ?? styling.buttonTextColor;

  return (
    <InspectorShell
      titleClassName="builder-app-field-config-title"
      title={
        <>
          <div className="builder-app-field-config-icon">
            <ButtonTypeIcon type={button.type} />
          </div>
          <span>{button.label}</span>
        </>
      }
      badge={getButtonTypeLabel(button.type)}
    >
      <InspectorCard title="Basic">
        <TextInputRow
          label="Label"
          value={button.label}
          onChange={(event) => onButtonUpdate(button.id, "label", event.target.value)}
        />
        <SelectRow
          label="Action"
          value={button.type}
          onChange={(event) =>
            onButtonTypeChange(button.id, event.target.value as FormButtonType)
          }
        >
          {BUTTON_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectRow>
      </InspectorCard>

      <InspectorCard title="Visibility">
        <ToggleRow
          label="Show button label"
          checked={button.isLabelVisible ?? true}
          onChange={(checked) => onButtonUpdate(button.id, "isLabelVisible", checked)}
        />
        <ToggleRow
          label="Show left icon"
          checked={button.isLeftIconVisible ?? false}
          onChange={(checked) => onButtonUpdate(button.id, "isLeftIconVisible", checked)}
        />
        <ToggleRow
          label="Show right icon"
          checked={button.isRightIconVisible ?? false}
          onChange={(checked) => onButtonUpdate(button.id, "isRightIconVisible", checked)}
        />
      </InspectorCard>

      {button.isLeftIconVisible || button.isRightIconVisible ? (
        <InspectorCard title="Icons">
          {button.isLeftIconVisible ? (
            <SelectRow
              label="Left icon"
              value={button.leftIcon}
              onChange={(event) =>
                onButtonUpdate(button.id, "leftIcon", event.target.value as FormButtonIcon)
              }
            >
              {BUTTON_ICON_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectRow>
          ) : null}
          {button.isRightIconVisible ? (
            <SelectRow
              label="Right icon"
              value={button.rightIcon}
              onChange={(event) =>
                onButtonUpdate(button.id, "rightIcon", event.target.value as FormButtonIcon)
              }
            >
              {BUTTON_ICON_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectRow>
          ) : null}
        </InspectorCard>
      ) : null}

      <InspectorCard title="Style">
        <SelectRow
          label="Button style"
          value={effectiveVariant}
          onChange={(event) =>
            onButtonUpdate(
              button.id,
              "variant",
              (event.target.value || undefined) as FormActionButton["variant"],
            )
          }
        >
          <option value="">Default</option>
          <option value="solid">Solid</option>
          <option value="outline">Outline</option>
        </SelectRow>
        <SplitValueRow
          label="Padding"
          mode={effectivePaddingMode}
          allValue={effectivePadding}
          max={40}
          labels={["T", "R", "B", "L"]}
          values={[
            effectivePaddingTop,
            effectivePaddingRight,
            effectivePaddingBottom,
            effectivePaddingLeft,
          ]}
          onAllChange={(value) => onButtonUpdate(button.id, "padding", value)}
          onUseAll={() => onButtonUpdate(button.id, "paddingMode", "all")}
          onUseIndividual={() => {
            onButtonUpdate(button.id, "paddingMode", "individual");
            onButtonUpdate(button.id, "paddingTop", effectivePadding);
            onButtonUpdate(button.id, "paddingRight", effectivePadding);
            onButtonUpdate(button.id, "paddingBottom", effectivePadding);
            onButtonUpdate(button.id, "paddingLeft", effectivePadding);
          }}
          onValueChange={(index, value) => {
            const keys: Array<"paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft"> = [
              "paddingTop",
              "paddingRight",
              "paddingBottom",
              "paddingLeft",
            ];
            onButtonUpdate(button.id, keys[index], value);
          }}
        />
        <SplitValueRow
          label="Radius"
          mode={effectiveRadiusMode}
          allValue={effectiveRadius}
          max={32}
          labels={["TL", "TR", "BR", "BL"]}
          values={[
            effectiveRadiusTopLeft,
            effectiveRadiusTopRight,
            effectiveRadiusBottomRight,
            effectiveRadiusBottomLeft,
          ]}
          onAllChange={(value) => onButtonUpdate(button.id, "radius", value)}
          onUseAll={() => onButtonUpdate(button.id, "radiusMode", "all")}
          onUseIndividual={() => {
            onButtonUpdate(button.id, "radiusMode", "individual");
            onButtonUpdate(button.id, "radiusTopLeft", effectiveRadius);
            onButtonUpdate(button.id, "radiusTopRight", effectiveRadius);
            onButtonUpdate(button.id, "radiusBottomRight", effectiveRadius);
            onButtonUpdate(button.id, "radiusBottomLeft", effectiveRadius);
          }}
          onValueChange={(index, value) => {
            const keys: Array<
              "radiusTopLeft" | "radiusTopRight" | "radiusBottomRight" | "radiusBottomLeft"
            > = ["radiusTopLeft", "radiusTopRight", "radiusBottomRight", "radiusBottomLeft"];
            onButtonUpdate(button.id, keys[index], value);
          }}
        />
        <TextInputRow
          label="Border width"
          type="number"
          min={0}
          max={12}
          step={0.1}
          value={effectiveBorderWidth}
          onChange={(event) =>
            onButtonUpdate(
              button.id,
              "borderWidth",
              event.target.value === "" ? undefined : Number(event.target.value || 0),
            )
          }
        />
        <TextInputRow
          label="Text size"
          type="number"
          min={8}
          max={32}
          value={effectiveTextSize}
          onChange={(event) =>
            onButtonUpdate(
              button.id,
              "textSize",
              event.target.value === "" ? undefined : Number(event.target.value || 0),
            )
          }
        />
        <SelectRow
          label="Text weight"
          value={effectiveTextWeight.toString()}
          onChange={(event) =>
            onButtonUpdate(
              button.id,
              "textWeight",
              event.target.value === "" ? undefined : Number(event.target.value),
            )
          }
        >
          <option value="">Default</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
          <option value="600">600</option>
          <option value="700">700</option>
        </SelectRow>
        <ColorInputRow
          label="Fill"
          value={effectiveFillColor}
          onChange={(value) =>
            onButtonUpdate(button.id, "fillColor", value || undefined)
          }
        />
        <ColorInputRow
          label="Border"
          value={effectiveBorderColor}
          onChange={(value) =>
            onButtonUpdate(button.id, "borderColor", value || undefined)
          }
        />
        <ColorInputRow
          label="Text color"
          value={effectiveTextColor}
          onChange={(value) =>
            onButtonUpdate(button.id, "textColor", value || undefined)
          }
        />
      </InspectorCard>

      <ItemLayoutCard
        previewMode={previewMode}
        width={currentWidth}
        onWidthChange={(value) => onButtonWidthSet(button.id, value)}
      />
    </InspectorShell>
  );
}

type BuilderModePanelProps = {
  activeTab: RightPanelTab;
  previewMode: PreviewMode;
  styling: StylingValues;
  selectedField?: Field;
  selectedButton?: FormActionButton;
  onTabChange: (tab: RightPanelTab) => void;
  onFieldUpdate: <K extends keyof Field>(id: string, key: K, value: Field[K]) => void;
  onFieldTypeChange: (id: string, type: FieldType) => void;
  onFieldWidthSet: (id: string, width: WidthOption) => void;
  onButtonUpdate: <K extends keyof FormActionButton>(
    id: string,
    key: K,
    value: FormActionButton[K],
  ) => void;
  onButtonTypeChange: (id: string, type: FormButtonType) => void;
  onButtonWidthSet: (id: string, width: WidthOption) => void;
};

export function BuilderModePanel({
  activeTab,
  previewMode,
  styling,
  selectedField,
  selectedButton,
  onTabChange,
  onFieldUpdate,
  onFieldTypeChange,
  onFieldWidthSet,
  onButtonUpdate,
  onButtonTypeChange,
  onButtonWidthSet,
}: BuilderModePanelProps) {
  return (
    <>
      <div className="builder-app-code-tabs">
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "field" ? "is-active" : ""}`}
          onClick={() => onTabChange("field")}
        >
          Field
        </button>
        <button
          type="button"
          className={`builder-app-code-tab ${activeTab === "button" ? "is-active" : ""}`}
          onClick={() => onTabChange("button")}
        >
          Button
        </button>
      </div>

      {activeTab === "field" && selectedField ? (
        <FieldConfigPanel
          field={selectedField}
          previewMode={previewMode}
          onFieldUpdate={onFieldUpdate}
          onFieldTypeChange={onFieldTypeChange}
          onFieldWidthSet={onFieldWidthSet}
        />
      ) : null}

      {activeTab === "button" && selectedButton ? (
        <ButtonConfigPanel
          button={selectedButton}
          previewMode={previewMode}
          styling={styling}
          onButtonUpdate={onButtonUpdate}
          onButtonTypeChange={onButtonTypeChange}
          onButtonWidthSet={onButtonWidthSet}
        />
      ) : null}
    </>
  );
}
