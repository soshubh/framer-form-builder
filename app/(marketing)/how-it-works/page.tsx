import { LandingSubpageShell } from "../components/subpage-shell";
import styles from "../page.module.css";

const basePathSteps = [
  {
    title: "Choose the field structure",
    body:
      "Start with the form itself. Add the field types you need, choose labels and helper copy, and decide how the layout should be organized.",
  },
  {
    title: "Style the form system",
    body:
      "Tune the design layer inside the same builder. Adjust spacing, radius, color, padding, and button treatment so the exported result stays aligned with the preview.",
  },
  {
    title: "Turn on the behavior you need",
    body:
      "Enable delivery and interaction options depending on the project. This is where Google Sheets, webhooks, redirects, and OTP-related flows are switched on.",
  },
  {
    title: "Copy the Framer component code",
    body:
      "Once the structure, styling, and behaviors are ready, copy the generated Framer component code and paste it into Framer.",
  },
] as const;

const createPath = (
  title: string,
  body: string,
  behaviorBody: string,
  integrationSteps: readonly { title: string; body: string }[],
) => ({
  title,
  body,
  steps: [
    basePathSteps[0],
    basePathSteps[1],
    {
      title: basePathSteps[2].title,
      body: behaviorBody,
    },
    basePathSteps[3],
    ...integrationSteps,
  ],
});

const deliveryPaths = [
  createPath(
    "Google Sheets only",
    "Use this path when the only goal is to send submissions into a sheet.",
    "Turn on Google Sheets in the builder because this setup only needs sheet delivery.",
    [
      {
        title: "Paste the App Script code into Google Sheets",
        body:
          "Copy the generated App Script code and paste it into Google Sheets Apps Script.",
      },
      {
        title: "Publish the script URL and paste it back",
        body:
          "Deploy the Apps Script, copy the published URL, and paste that URL back into the Google Sheets field in the builder.",
      },
    ],
  ),
  createPath(
    "Webhook only",
    "Use this path when the form should send data directly to your backend or automation tool.",
    "Turn on webhook delivery in the builder because this setup only needs a webhook destination.",
    [
      {
        title: "Paste the webhook URL into the builder",
        body:
          "Copy your webhook endpoint and paste it into the webhook field so submissions route directly there.",
      },
    ],
  ),
  createPath(
    "Google Sheets + webhook",
    "Use this when the same form should write to Sheets and also send the payload to a webhook.",
    "Turn on both Google Sheets and webhook because this setup needs both destinations active at the same time.",
    [
      {
        title: "Paste the App Script code into Google Sheets",
        body:
          "Copy the generated App Script code and paste it into Google Sheets Apps Script.",
      },
      {
        title: "Publish the script URL and paste it back",
        body:
          "Deploy the Apps Script, copy the published URL, and paste that URL back into the Google Sheets field in the builder.",
      },
      {
        title: "Paste the webhook URL into the builder",
        body:
          "Paste the webhook endpoint into the webhook field so the same form also sends the payload to your backend or automation flow.",
      },
    ],
  ),
  createPath(
    "OTP on top of any path",
    "OTP is an add-on layer. It can sit on top of a Sheets flow, a webhook flow, or both together.",
    "Turn on the base delivery you need first, then enable OTP verification only if this path needs the extra verification layer.",
    [
      {
        title: "Complete the base delivery setup",
        body:
          "Finish the normal Google Sheets path, webhook path, or both together depending on where the form data should go.",
      },
      {
        title: "Paste the OTP webhook URL",
        body:
          "Copy the OTP webhook or OTP service URL and paste it into the OTP field. This is the only extra integration step on top of the base path.",
      },
    ],
  ),
] as const;

export default function HowItWorksPage() {
  return (
    <LandingSubpageShell
      eyebrow="How it works"
      title="From setup to shipped."
      lede="Build, style, connect, export. One path, no rebuilding."
      heroClassName={styles.subpageHeroShifted}
      titleClassName={styles.subpageHeroTitleFixed}
      ledeClassName={styles.subpageHeroLedeFixed}
    >
      <section className={styles.subpageAccordion}>
        {deliveryPaths.map((path, index) => (
          <details
            className={styles.subpageAccordionItem}
            key={path.title}
            name="how-it-works-paths"
            open={index === 0}
          >
            <summary className={styles.subpageAccordionSummary}>
              <div className={styles.subpageAccordionSummaryCopy}>
                <h2 className={styles.subpageSectionTitle}>{path.title}</h2>
                <p className={styles.subpageSectionBody}>{path.body}</p>
              </div>
              <span className={styles.subpageAccordionChevron} aria-hidden="true">
                +
              </span>
            </summary>
            <div className={styles.subpageAccordionContent}>
              <div className={styles.subpagePath}>
                {path.steps.map((step, stepIndex) => (
                  <article className={styles.subpagePathStep} key={step.title}>
                    <div className={styles.subpagePathRail}>
                      <div className={styles.subpageStepNumber}>{stepIndex + 1}</div>
                    </div>
                    <div className={styles.subpagePathContent}>
                      <h3 className={styles.subpageSectionTitle}>{step.title}</h3>
                      <p className={styles.subpageSectionBody}>{step.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </details>
        ))}
      </section>
    </LandingSubpageShell>
  );
}
