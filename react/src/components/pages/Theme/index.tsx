import { useContext, useEffect } from "react";
import { ThemeContext } from "@/composables/contexts/useThemeContext";

export const Theme: React.FC = () => {
  const { setDefaultTheme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setDefaultTheme();
    return setDefaultTheme;
  }, [setDefaultTheme]);
  return (
    <div>
      <button onClick={toggleTheme}>toggle theme</button>
    </div>
  );
};
