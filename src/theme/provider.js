import { useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useConfig } from "../config/provider";

const Provider = ({children}) => {
  const {darkMode} = useConfig();

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    },
    typography: {
      button: {
        textTransform: "none"
      }
    },
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            height: "calc(100% - 64px)"
          }
        }
      }
    }
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Provider;
