import { createContext, useCallback, useEffect, useState } from "react";
import { getDefaultTheme } from "../../../../common/script/utils/theme";

type Theme = "dark" | "light";

type ThemeContextType = {
  setDefaultTheme: () => void;
  toggleTheme: () => void
};

export const ThemeContext = createContext<ThemeContextType>({
  setDefaultTheme: () => { /* do nothing */ },
  toggleTheme: () => { /* do nothing */ },
});

export const useThemeContext = (): ThemeContextType & { theme: Theme } => {
  const [theme, setTheme] = useState<Theme>("light");

  /* set default theme based on browser preference */
  const setDefaultTheme = useCallback(() => {
    setTheme(getDefaultTheme())
  }, [])

  /* toggle theme */
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  /* update theme if state changed */
  useEffect(() => {
    const classListMethod = theme === "dark" ? "add" : "remove";
    document.documentElement.classList[classListMethod]("dark");
  }, [theme]);

  return {
    theme,
    setDefaultTheme,
    toggleTheme,
  };
};
