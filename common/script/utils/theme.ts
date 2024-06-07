export const getDefaultTheme = () => {
  const darkMql = window.matchMedia("(prefers-color-scheme: dark)");
  return darkMql.matches ? "dark" : "light";
};
