import { useState, useCallback, createContext, useContext } from "react";

const ConfigContext = createContext({});

const Provider = ({children}) => {
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
    <ConfigContext.Provider value={{
      darkMode, toggleDarkMode,
      saveData, toggleSaveData
    }}>
      {children}
    </ConfigContext.Provider>
  );
}

const useConfig = () => useContext(ConfigContext);

export default Provider;
export { useConfig };
