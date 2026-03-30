"use client";

import { BuilderModePanel } from "./builder-panel";
import { CodeModePanel } from "./code-panel";
import { IntegrationsModePanel, SettingsModePanel } from "./settings-panel";
import { resolveStylingForPreview } from "../../lib/builder-config";
import type { BuilderRightPanelProps } from "./types";

export function BuilderRightPanel({
  mode,
  activeTab,
  config,
  copiedState,
  generatedAppsScript,
  generatedFramerCode,
  previewMode,
  selectedField,
  selectedButton,
  onCopy,
  onTabChange,
  onConfigChange,
  onFieldUpdate,
  onFieldTypeChange,
  onFieldWidthSet,
  onButtonUpdate,
  onButtonTypeChange,
  onButtonWidthSet,
}: BuilderRightPanelProps) {
  const activeStyling = resolveStylingForPreview(config.styling, previewMode);

  return (
    <aside className="builder-app-right-panel">
      {mode === "builder" ? (
        <BuilderModePanel
          activeTab={activeTab}
          previewMode={previewMode}
          styling={activeStyling}
          selectedField={selectedField}
          selectedButton={selectedButton}
          onTabChange={onTabChange}
          onFieldUpdate={onFieldUpdate}
          onFieldTypeChange={onFieldTypeChange}
          onFieldWidthSet={onFieldWidthSet}
          onButtonUpdate={onButtonUpdate}
          onButtonTypeChange={onButtonTypeChange}
          onButtonWidthSet={onButtonWidthSet}
        />
      ) : null}

      {mode === "code" ? (
        <CodeModePanel
          activeTab={activeTab}
          copiedState={copiedState}
          generatedAppsScript={generatedAppsScript}
          generatedFramerCode={generatedFramerCode}
          onCopy={onCopy}
          onTabChange={onTabChange}
        />
      ) : null}

      {mode === "style" ? (
        <SettingsModePanel
          activeTab={activeTab}
          config={config}
          previewMode={previewMode}
          onTabChange={onTabChange}
          onConfigChange={onConfigChange}
        />
      ) : null}

      {mode === "integrations" ? (
        <IntegrationsModePanel
          config={config}
          onConfigChange={onConfigChange}
        />
      ) : null}
    </aside>
  );
}
