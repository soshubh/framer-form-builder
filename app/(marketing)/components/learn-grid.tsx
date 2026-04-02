"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import styles from "../page.module.css";

type LearnGridProps = {
  left: ReactNode;
  middle: ReactNode;
  right: ReactNode;
};

export function LearnGrid({ left, middle, right }: LearnGridProps) {
  const referenceCardRef = useRef<HTMLElement | null>(null);
  const [referenceCardHeight, setReferenceCardHeight] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const referenceCard = referenceCardRef.current;

    if (!referenceCard) {
      return;
    }

    const updateHeight = () => {
      setReferenceCardHeight(referenceCard.getBoundingClientRect().height);
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(referenceCard);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div
      className={styles.learnGrid}
      style={
        referenceCardHeight
          ? ({
              "--learn-reference-height": `${referenceCardHeight}px`,
            } as CSSProperties)
          : undefined
      }
    >
      <article className={`${styles.learnCard} ${styles.learnCardMatchReference}`}>
        {left}
      </article>
      <article className={styles.learnCard} ref={referenceCardRef}>
        {middle}
      </article>
      <article className={`${styles.learnCard} ${styles.learnCardMatchReference}`}>
        {right}
      </article>
    </div>
  );
}
