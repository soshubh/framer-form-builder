import type { ReactNode } from "react";

import { LandingFooter } from "./footer";
import { GridBackground } from "./GridBackground";
import { marketingDisplay, marketingSans } from "./marketing-fonts";
import { landingNavItems } from "./nav-items";
import styles from "../page.module.css";
import { LandingTopbar } from "./topbar";

type LandingSubpageShellProps = {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
  heroClassName?: string;
  titleClassName?: string;
  ledeClassName?: string;
};

export function LandingSubpageShell({
  eyebrow: _eyebrow,
  title,
  lede,
  children,
  heroClassName,
  titleClassName,
  ledeClassName,
}: LandingSubpageShellProps) {
  return (
    <main
      className={`${styles.page} ${marketingSans.variable} ${marketingDisplay.variable}`}
    >
      <GridBackground />
      <LandingTopbar items={landingNavItems} />
      <div className={styles.subpageMain}>
        <header
          className={
            heroClassName
              ? `${styles.subpageHero} ${heroClassName}`
              : styles.subpageHero
          }
        >
          <h1
            className={
              titleClassName
                ? `${styles.subpageTitle} ${titleClassName}`
                : styles.subpageTitle
            }
          >
            {title}
          </h1>
          <p
            className={
              ledeClassName
                ? `${styles.subpageLede} ${ledeClassName}`
                : styles.subpageLede
            }
          >
            {lede}
          </p>
        </header>
        <div className={styles.subpageSections}>{children}</div>
      </div>
      <LandingFooter />
    </main>
  );
}
