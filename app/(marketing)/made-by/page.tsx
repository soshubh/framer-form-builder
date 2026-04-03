import Link from "next/link";

import { LandingSubpageShell } from "../components/subpage-shell";
import styles from "../page.module.css";

export default function MadeByPage() {
  return (
    <LandingSubpageShell
      eyebrow="Made by"
      title="Free to use. Free to improve."
      lede="Built from a real gap. Open to everyone."
      heroClassName={styles.madeByHero}
      titleClassName={styles.madeByHeroTitle}
      ledeClassName={styles.madeByHeroLede}
    >
      <section className={styles.subpageSection}>
        <blockquote className={styles.subpageQuote}>
          I needed a way to build Framer forms that felt as capable as
          hand-written code, without writing any of it.
        </blockquote>
        <div className={styles.subpageQuoteMeta}>Shubh</div>
      </section>

      <section className={styles.subpageGrid}>
        <article className={styles.subpageSection}>
          <h2 className={styles.subpageSectionTitle}>The original problem</h2>
          <p className={styles.subpageSectionBody}>
            Forms kept breaking between the design, the builder, and the final
            export. Every change meant touching the code. Every integration
            meant rebuilding the delivery path. The form never stayed in one
            piece across the whole workflow.
          </p>
        </article>
        <article className={styles.subpageSection}>
          <h2 className={styles.subpageSectionTitle}>Why this product exists</h2>
          <p className={styles.subpageSectionBody}>
            To do everything code can do for a Framer form, without needing to
            write it. Field logic, delivery routing, styling, validation — all
            from one builder. The output is clean, paste-ready code that
            reflects exactly what was built.
          </p>
        </article>
      </section>

      <section className={styles.subpageSection}>
        <h2 className={styles.subpageSectionTitle}>What the product covers</h2>
        <ul className={styles.subpageBulletList}>
          <li>Form structure that stays consistent from builder to export.</li>
          <li>Field behavior and validation without custom scripts.</li>
          <li>Delivery to Sheets and webhooks without separate integration work.</li>
          <li>Code output that does not need a rewrite after it leaves the builder.</li>
        </ul>
      </section>

      <section className={styles.subpageSection}>
        <h2 className={styles.subpageSectionTitle}>Want to make it better?</h2>
        <p className={styles.subpageSectionBody}>
          WHIM is open. If something is missing, broken, or could work better
          — you can say so or fix it directly.
        </p>
        <div className={styles.subpageActionList}>
          <a
            className={styles.subpageActionLink}
            href="https://github.com/soshubh/framer-form-builder"
            rel="noreferrer"
            target="_blank"
          >
            Contribute on GitHub →
          </a>
          <a
            className={styles.subpageActionLink}
            href="https://github.com/soshubh/framer-form-builder/issues"
            rel="noreferrer"
            target="_blank"
          >
            Report a bug →
          </a>
          <a
            className={styles.subpageActionLink}
            href="mailto:workforshubhsingh@gmail.com"
          >
            Share feedback →
          </a>
        </div>
      </section>

      <section className={styles.subpageSection}>
        <h2 className={styles.subpageSectionTitle}>Open to everyone</h2>
        <p className={styles.subpageSectionBody}>
          Free to use. No account needed. No paywall. If you build something
          with it or improve it, that makes it better for everyone who comes
          after.
        </p>
      </section>
    </LandingSubpageShell>
  );
}
