import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "common/css/toast.module.css";
import { createPortal } from "react-dom";

type Props = {
  onClear: () => void;
  children: React.ReactNode;
};

/* to give enough time for inspection when presenting */
const PROPS_SHOW_DURATION = 10_000;

export const Toast = forwardRef<{ clear: Props["onClear"] }, Props>(
  ({ onClear, children }, ref) => {
    /* progress */
    const [timeLeft, setTimeLeft] = useState(PROPS_SHOW_DURATION);
    const progressWidth = `${(timeLeft / PROPS_SHOW_DURATION) * 100}%`;

    useEffect(() => {
      if (timeLeft <= 0) onClear();
    }, [onClear, timeLeft]);

    const raf = useRef<number>();
    const rafStartTime = useRef<number>();
    const rafCallback = useCallback((timestamp: number) => {
      if (!rafStartTime.current) {
        rafStartTime.current = timestamp;
      }

      const currentTimeLeft =
        PROPS_SHOW_DURATION - (timestamp - rafStartTime.current);
      setTimeLeft(currentTimeLeft);

      if (currentTimeLeft <= 0) return;

      raf.current = window.requestAnimationFrame(rafCallback);
    }, []);

    useEffect(() => {
      if (raf.current) window.cancelAnimationFrame(raf.current);
      raf.current = undefined;
      if (!children) return;

      rafStartTime.current = undefined;
      raf.current = window.requestAnimationFrame(rafCallback);
    }, [children, rafCallback]);

    /* ref expose demonstration */
    useImperativeHandle(ref, () => ({ clear: onClear }));

    return createPortal(
      <div
        className={`${styles.toast} ${styles.toast__react}`}
        style={{ display: children ? "block" : "none" }}
      >
        {children}
        <div
          className={styles.toast_progress}
          style={{ width: progressWidth }}
        />
      </div>,
      document.body,
    );
  },
);
