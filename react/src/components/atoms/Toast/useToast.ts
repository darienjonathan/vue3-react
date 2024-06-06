import { useState } from "react";

export const useToast = () => {
  const [toastText, setToastText] = useState("");
  const clearToast = () => {
    setToastText("")
  };
  const showToast = (text: string) => {
    setToastText(text);
  };

  return {
    toastText,
    clearToast,
    showToast,
  };
};
