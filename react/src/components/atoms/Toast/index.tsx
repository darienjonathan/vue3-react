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
  isShown: boolean;
  onClear: () => void;
  children: React.ReactNode;
};

/* to give enough time for inspection when presenting */
const PROPS_SHOW_DURATION = 10_000;

export const Toast = forwardRef<{ clear: Props["onClear"] }, Props>(
  ({ isShown, onClear, children }, ref) => {
    /* progress */
    const [timeProgress, setTimeProgres] = useState(0);
    const progressWidth = `${100 - (timeProgress / PROPS_SHOW_DURATION) * 100}%`;

    const raf = useRef<number>();
    const rafStartTime = useRef<number>();
    const rafCallback = useCallback(
      (timestamp: number) => {
        if (!rafStartTime.current) {
          rafStartTime.current = timestamp;
        }

        const currentTimeProgress = timestamp - rafStartTime.current;
        if (currentTimeProgress >= PROPS_SHOW_DURATION) {
          onClear();
          return;
        }

        raf.current = window.requestAnimationFrame(rafCallback);
        setTimeProgres(currentTimeProgress);
      },
      [onClear],
    );

    useEffect(() => {
      if (raf.current) window.cancelAnimationFrame(raf.current);
      raf.current = undefined;
      if (!isShown) return;

      rafStartTime.current = undefined;
      raf.current = window.requestAnimationFrame(rafCallback);
    }, [rafCallback, isShown]);

    /* ref expose demonstration */
    useImperativeHandle(ref, () => ({ clear: onClear }));

    return createPortal(
      <div
        className={`${styles.toast} ${styles.toast__react}`}
        style={{ display: isShown ? "block" : "none" }}
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
