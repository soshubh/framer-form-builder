import { LandingSubpageShell } from "../components/subpage-shell";
import styles from "../page.module.css";

const audiences = [
  {
    title: "Own your delivery path",
    body:
      "Pick where submissions go. Sheets, webhook, or both. No default path forced on you.",
  },
  {
    title: "Forms with more than one step",
    body:
      "Multi-step flows, conditional fields, and state changes. Built from the same system, not patched together.",
  },
  {
    title: "Edit without opening the code",
    body:
      "Change labels, spacing, layout, or behavior from the builder. Nothing requires a developer to update.",
  },
  {
    title: "Connect to real tools",
    body:
      "Sheets, webhooks, OTP services. The integration is part of the build, not a separate setup after.",
  },
  {
    title: "Ship fast, change faster",
    body:
      "Add fields, swap layouts, update flows. Without rebuilding the form from scratch each time.",
  },
  {
    title: "Know what you want, skip the code",
    body:
      "You have a clear idea of how the form should behave. WHIM handles the logic so you don't have to write it.",
  },
];

export default function MadeForPage() {
  return (
    <LandingSubpageShell
      eyebrow="Made for"
      title="Built for real form problems."
      lede="When the form needs to look right, behave correctly, and connect to actual workflows."
      heroClassName={styles.subpageHeroShifted}
      titleClassName={styles.subpageHeroTitleFixed}
      ledeClassName={styles.subpageHeroLedeFixed}
    >
      <section className={styles.subpageSection}>
        <h2 className={styles.subpageSectionTitle}>
          Where Framer stops by default
        </h2>
        <p className={styles.subpageSectionBody}>
          Framer handles layout well. But once you need structured field logic,
          conditional behavior, OTP verification, or a delivery path that
          isn&apos;t hardcoded — you&apos;re on your own.
        </p>
        <ul className={styles.subpageBulletList}>
          <li>
            No built-in way to export a form as a ready-to-paste Framer
            component.
          </li>
          <li>
            Field conditions, phone/country split, and OTP flow need custom
            code every time.
          </li>
          <li>
            Google Sheets and webhook routing live outside the form, not
            connected to it.
          </li>
          <li>
            Changing a label or spacing means touching the code again.
          </li>
        </ul>
      </section>

      <section className={styles.subpageGrid}>
        {audiences.map((item) => (
          <article className={styles.subpageSection} key={item.title}>
            <h2 className={styles.subpageSectionTitle}>{item.title}</h2>
            <p className={styles.subpageSectionBody}>{item.body}</p>
          </article>
        ))}
      </section>
    </LandingSubpageShell>
  );
}
