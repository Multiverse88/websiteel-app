"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, TriangleAlert } from "lucide-react";
import styles from "./PaymentVerificationPage.module.css";

type CopyState = "idle" | "success" | "failure";

const SUCCESS_MESSAGE = "Nomor rekening tersalin";
const FAILURE_MESSAGE = "Gagal menyalin. Pilih nomor rekening secara manual.";
const STATUS_RESET_MS = 4000;

export default function CopyAccountButton({
  accountNumber,
}: {
  accountNumber: string;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const resetTimerRef = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (resetTimerRef.current !== undefined) {
        window.clearTimeout(resetTimerRef.current);
      }
    },
    [],
  );

  const scheduleReset = useCallback(() => {
    if (resetTimerRef.current !== undefined) {
      window.clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => {
      setState("idle");
      resetTimerRef.current = undefined;
    }, STATUS_RESET_MS);
  }, []);

  const handleCopy = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(accountNumber);
        setState("success");
      } catch {
        setState("failure");
      }
    } else {
      setState("failure");
    }
    scheduleReset();
    buttonRef.current?.focus();
  }, [accountNumber, scheduleReset]);

  const statusMessage =
    state === "success" ? SUCCESS_MESSAGE : state === "failure" ? FAILURE_MESSAGE : "";

  return (
    <div className={styles.copyWrap}>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.copyButton}${state === "failure" ? ` ${styles.copyButtonFailure}` : ""}`}
        onClick={handleCopy}
        aria-label={`Salin nomor rekening ${accountNumber}`}
      >
        {state === "success" ? (
          <Check size={18} strokeWidth={2.4} aria-hidden="true" />
        ) : state === "failure" ? (
          <TriangleAlert size={18} strokeWidth={2.2} aria-hidden="true" />
        ) : (
          <Copy size={18} strokeWidth={2.1} aria-hidden="true" />
        )}
        <span aria-hidden="true">
          {state === "success"
            ? "Tersalin"
            : state === "failure"
              ? "Salin Ulang"
              : "Salin Nomor Rekening"}
        </span>
      </button>
      <p
        className={`${styles.copyStatus}${state === "failure" ? ` ${styles.copyStatusFailure}` : ""}`}
        role="status"
        aria-live="polite"
      >
        {statusMessage}
      </p>
    </div>
  );
}
