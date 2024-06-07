import { inject, provide, readonly, ref, watch } from "vue";
import { getDefaultTheme } from "../../../../common/script/utils/theme";

type Theme = "dark" | "light";

type ThemeContext = {
  setDefaultTheme: () => void;
  toggleTheme: () => void;
}

export const ThemeKey = Symbol("theme");

export const useProvideTheme = () => {
  const theme = ref<Theme>("light");

  /* set default theme based on browser preference */
  const setDefaultTheme = () => {
    theme.value = getDefaultTheme();
  };

  /* toggle theme */
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  /* update theme if state changed */
  watch(theme, () => {
    const classListMethod = theme.value === "dark" ? "add" : "remove";
    document.documentElement.classList[classListMethod]("dark");
  })

  provide<ThemeContext>(ThemeKey, {
    setDefaultTheme,
    toggleTheme,
  });

  return {
    theme: readonly(theme)
  }
};

export const useInjectTheme = (): ThemeContext => {
  return inject(ThemeKey, {
    setDefaultTheme: () => { /* do nothing */ },
    toggleTheme: () => { /* do nothing */ },
  }) 
}
