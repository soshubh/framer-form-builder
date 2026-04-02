"use client";

import { useState } from "react";

import styles from "../page.module.css";

export function BuilderStatePreview() {
  const [toggleStates, setToggleStates] = useState({
    otp: true,
    sheets: true,
    webhook: true,
    redirect: false,
  });

  const toggleItem = (key: keyof typeof toggleStates) => {
    setToggleStates((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className={styles.toggleList}>
      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <div className={styles.toggleLabel}>Enable OTP verification</div>
          <div className={styles.toggleDescription}>
            Verify mobile submissions before form send.
          </div>
        </div>
        <button
          aria-pressed={toggleStates.otp}
          className={`${styles.toggleSwitch} ${toggleStates.otp ? styles.toggleSwitchEnabled : ""}`}
          onClick={() => toggleItem("otp")}
          type="button"
        >
          <span className={styles.toggleKnob} />
        </button>
      </div>
      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <div className={styles.toggleLabel}>Enable Google Sheets</div>
          <div className={styles.toggleDescription}>
            Sync submissions into a connected sheet automatically.
          </div>
        </div>
        <button
          aria-pressed={toggleStates.sheets}
          className={`${styles.toggleSwitch} ${toggleStates.sheets ? styles.toggleSwitchEnabled : ""}`}
          onClick={() => toggleItem("sheets")}
          type="button"
        >
          <span className={styles.toggleKnob} />
        </button>
      </div>
      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <div className={styles.toggleLabel}>Enable data webhook</div>
          <div className={styles.toggleDescription}>
            Send structured payloads to your backend endpoint.
          </div>
        </div>
        <button
          aria-pressed={toggleStates.webhook}
          className={`${styles.toggleSwitch} ${toggleStates.webhook ? styles.toggleSwitchEnabled : ""}`}
          onClick={() => toggleItem("webhook")}
          type="button"
        >
          <span className={styles.toggleKnob} />
        </button>
      </div>
      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <div className={styles.toggleLabel}>Enable redirect on submit</div>
          <div className={styles.toggleDescription}>
            Take visitors to a destination after successful submit.
          </div>
        </div>
        <button
          aria-pressed={toggleStates.redirect}
          className={`${styles.toggleSwitch} ${toggleStates.redirect ? styles.toggleSwitchEnabled : ""}`}
          onClick={() => toggleItem("redirect")}
          type="button"
        >
          <span className={styles.toggleKnob} />
        </button>
      </div>
    </div>
  );
}
