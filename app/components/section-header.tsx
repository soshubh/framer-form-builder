import type { ReactNode } from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";

type BuilderSectionHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function BuilderSectionHeader({
  title,
  description,
  action,
}: BuilderSectionHeaderProps) {
  return (
    <div className="builder-section-header-row">
      <div className="builder-section-header">
        <CardTitle className="builder-section-title">{title}</CardTitle>
        {description ? (
          <CardDescription className="builder-section-description">
            {description}
          </CardDescription>
        ) : null}
      </div>
      {action ? <div className="builder-section-action">{action}</div> : null}
    </div>
  );
}
