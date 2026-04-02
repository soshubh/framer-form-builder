"use client";

import { useEffect, useState } from "react";

import styles from "../page.module.css";

export function CodePreviewCopyButton() {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsCopied(false);
    }, 1400);

    return () => window.clearTimeout(timeout);
  }, [isCopied]);

  return (
    <button
      className={`${styles.codePreviewCopy} ${isCopied ? styles.codePreviewCopyActive : ""}`}
      onClick={() => setIsCopied(true)}
      type="button"
    >
      {isCopied ? "Code copied" : "Copy"}
    </button>
  );
}
