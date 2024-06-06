import { ref } from "vue";

export const useToast = () => {
  const toastText = ref<string>("");
  const clearToast = () => {
    toastText.value = "";
  };
  const showToast = (text: string) => {
    toastText.value = text;
  };

  return {
    toastText,
    clearToast,
    showToast,
  };
};
