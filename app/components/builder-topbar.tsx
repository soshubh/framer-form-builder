import { SystemButton } from "./system-button";

type BuilderTopbarProps = {
  activeTab: "builder" | "code" | "style" | "integrations";
  onTabChange: (tab: "builder" | "code" | "style" | "integrations") => void;
  onNewForm: () => void;
};

export function BuilderTopbar({
  activeTab,
  onTabChange,
  onNewForm,
}: BuilderTopbarProps) {
  return (
    <header className="builder-app-topbar">
      <div className="builder-app-topbar-logo">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M0 0h18v9H9L0 18V0z" fill="currentColor" />
          <path d="M9 9h9v9L9 9z" fill="rgb(255 255 255 / 0.4)" />
        </svg>
        Form Builder
      </div>

      <div className="builder-app-topbar-divider" />

      <div className="builder-app-topbar-tabs">
        <button
          type="button"
          className={`builder-app-topbar-tab ${activeTab === "builder" ? "is-active" : ""}`}
          onClick={() => onTabChange("builder")}
        >
          Builder
        </button>
        <button
          type="button"
          className={`builder-app-topbar-tab ${activeTab === "code" ? "is-active" : ""}`}
          onClick={() => onTabChange("code")}
        >
          Code
        </button>
        <button
          type="button"
          className={`builder-app-topbar-tab ${activeTab === "style" ? "is-active" : ""}`}
          onClick={() => onTabChange("style")}
        >
          Style
        </button>
        <button
          type="button"
          className={`builder-app-topbar-tab ${activeTab === "integrations" ? "is-active" : ""}`}
          onClick={() => onTabChange("integrations")}
        >
          Integrations
        </button>
      </div>

      <div className="builder-app-topbar-actions">
        <SystemButton variant="ghost" size="sm" onClick={onNewForm}>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          New Form
        </SystemButton>
      </div>
    </header>
  );
}
