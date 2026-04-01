"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import styles from "../page.module.css";

type NavItem = {
  label: string;
  href: string;
};

type LandingTopbarProps = {
  items: readonly NavItem[];
};

export function LandingTopbar({ items }: LandingTopbarProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className={styles.topbar}>
      <div
        className={`${styles.topbarShell} ${isNavOpen ? styles.topbarShellExpanded : ""}`}
      >
        <div className={styles.topbarInner}>
          <Link
            aria-label="Go to homepage"
            className={styles.brand}
            href="/"
            onClick={() => setIsNavOpen(false)}
          >
            <Image
              alt="Framer Form Builder"
              className={styles.brandMark}
              priority
              src="/brand/FBFLogo.png"
              width={32}
              height={32}
            />
            <Image
              alt="Framer Form Builder wordmark"
              className={styles.brandWordmark}
              priority
              src="/brand/wordmark/WordMark.svg"
              width={112}
              height={18}
            />
          </Link>
          <nav aria-label="Primary" className={styles.topbarNav}>
            <div className={styles.topbarNavList}>
              {items.map((item) => (
                <Link
                  className={`${styles.topbarNavLink} ${pathname === item.href ? styles.topbarNavLinkActive : ""}`}
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
          <div className={styles.topbarActions}>
            <Link className={styles.primaryButton} href="/builder">
              Open Builder
            </Link>
          </div>
          <button
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
            className={`${styles.topbarMenuButton} ${isNavOpen ? styles.topbarMenuButtonOpen : ""}`}
            onClick={() => setIsNavOpen((current) => !current)}
            type="button"
          >
            <span />
            <span />
          </button>
        </div>
        <div
          className={`${styles.mobileNavPanel} ${isNavOpen ? styles.mobileNavPanelOpen : ""}`}
        >
          {items.map((item, index) => (
            <Link
              className={`${styles.mobileNavLink} ${styles.mobileNavEntry} ${pathname === item.href ? styles.mobileNavLinkActive : ""}`}
              href={item.href}
              key={item.label}
              onClick={() => setIsNavOpen(false)}
              style={{ "--nav-item-index": index } as CSSProperties}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className={`${styles.primaryButton} ${styles.mobileBuilderButton} ${styles.mobileNavEntry}`}
            href="/builder"
            onClick={() => setIsNavOpen(false)}
            style={{ "--nav-item-index": items.length } as CSSProperties}
          >
            Open Builder
          </Link>
        </div>
      </div>
    </div>
  );
}
