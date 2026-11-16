import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useState } from "react";

interface ConfigContextValue {
  readonly darkMode: boolean;
  toggleDarkMode: () => void;
  readonly saveData: boolean;
  toggleSaveData: () => void;
}

const ConfigContext = createContext<ConfigContextValue>({
  darkMode: false,
  toggleDarkMode: () => {},
  saveData: false,
  toggleSaveData: () => {},
});

const Provider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "on");
  const toggleDarkMode = useCallback(() => {
    localStorage.setItem("darkMode", darkMode ? "off" : "on");
    setDarkMode(!darkMode);
  }, [darkMode]);

  const [saveData, setSaveData] = useState(localStorage.getItem("saveData") === "on");
  const toggleSaveData = useCallback(() => {
    localStorage.setItem("saveData", saveData ? "off" : "on");
    setSaveData(!saveData);
  }, [saveData]);

  return (
    <ConfigContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        saveData,
        toggleSaveData,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default Provider;

export const useConfig = () => useContext(ConfigContext);
