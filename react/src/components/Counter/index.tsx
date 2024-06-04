import styles from "./index.module.css";
import { useState } from "react";

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const canDecrease = count > 0;

  const increase = () => setCount(count + 1);
  const decrease = () => {
    if (count <= 0) return;
    setCount(count - 1);
  };

  return (
    <div>
      <div className={styles.count}>currentCount: {count}</div>
      <button onClick={decrease} disabled={!canDecrease}>
        -
      </button>
      <button onClick={increase}>+</button>
    </div>
  );
};
