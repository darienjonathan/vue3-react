import { useEffect, useRef } from "react";
import styles from "common/css/toast.module.css";
import { createPortal } from "react-dom";

type Props = {
  isShown: boolean;
  onClear: () => void;
  children: React.ReactNode;
};

/* to give enough time for inspection when presenting */
const PROPS_SHOW_DURATION = 10000;

export const Toast: React.FC<Props> = ({ isShown, onClear, children }) => {
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = undefined;
    if (isShown) return;

    timer.current = window.setTimeout(() => {
      onClear();
    }, PROPS_SHOW_DURATION);
  }, [onClear, isShown]);

  return createPortal(
    <div
      className={`${styles.toast} ${styles.toast__react}`}
      style={{ display: isShown ? "block" : "none" }}
    >
      {children}
    </div>,
    document.body,
  );
};
