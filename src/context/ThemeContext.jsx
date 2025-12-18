import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const themeLink = document.getElementById("theme-css");

    if (darkMode) {
      themeLink.href =
        "https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css";
      localStorage.setItem("theme", "dark");
    } else {
      themeLink.href =
        "https://unpkg.com/primereact/resources/themes/lara-light-blue/theme.css";
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
