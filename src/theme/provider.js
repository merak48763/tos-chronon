import { useState, useMemo, createContext, useContext } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const ThemeContext = createContext({});

const Provider = ({children}) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "on");
  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", darkMode ? "off" : "on");
    setDarkMode(!darkMode);
  }

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    },
    typography: {
      button: {
        textTransform: "none"
      }
    }
  }), [darkMode]);

  return (
    <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

const useDarkModeConfig = () => useContext(ThemeContext);

export default Provider;
export { useDarkModeConfig };
