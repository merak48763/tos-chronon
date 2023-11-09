import { useState, useEffect, useMemo } from "react";
import { useChrononInfo } from "./data/chrononInfo";
import { CardList } from "./components/cardList";
import { LoadingDialog } from "./components/loadingDialog";
import { StarFilter, SeriesFilter } from "./components/filter";
import { Fab, Snackbar } from "@mui/material";
import {
  Brightness6Outlined as ThemeIcon,
  DataSaverOffOutlined as SaveDataOffIcon,
  DataSaverOnOutlined as SaveDataOnIcon
} from "@mui/icons-material";
import { useConfig } from "./config/provider";
import styled from "@emotion/styled";

const AppWrapper = styled.div`
  padding: 16px;
  padding-bottom: 120px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

function App() {
  const {darkMode, toggleDarkMode, saveData, toggleSaveData} = useConfig();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if(snackbarMessage !== "") {
      setIsSnackbarOpen(true);
    }
  }, [snackbarMessage]);

  const handleToggleDarkMode = () => {
    if(darkMode) {
      setSnackbarMessage("已經切換到淺色主題");
    }
    else {
      setSnackbarMessage("已經切換到深色主題");
    }
    toggleDarkMode();
  }
  const handleToggleSaveData = () => {
    if(saveData) {
      setSnackbarMessage("現在會預先載入卡圖");
    }
    else {
      setSnackbarMessage("已停用預先載入卡圖功能");
    }
    toggleSaveData();
  }

  const {ready, filter} = useChrononInfo();
  const [starFilter, setStarFilter] = useState([]);
  const [starFilterActive, setStarFilterActive] = useState(false);
  const [seriesFilter, setSeriesFilter] = useState([]);
  const [seriesFilterActive, setSeriesFilterActive] = useState(false);

  const filteredCards = useMemo(() => filter({
    seriesFilter: (seriesFilter.length > 0 && seriesFilterActive) ? seriesFilter : null,
    starFilter: (starFilter.length > 0 && starFilterActive) ? starFilter : null,
  }), [seriesFilter, seriesFilterActive, starFilter, starFilterActive, filter]);

  return (<>
    <AppWrapper>
      {ready && (<>
        <SeriesFilter value={seriesFilter} onChange={v => setSeriesFilter(v)} active={seriesFilterActive} onToggle={v => setSeriesFilterActive(v)} />
        <StarFilter value={starFilter} onChange={v => setStarFilter(v)} active={starFilterActive} onToggle={v => setStarFilterActive(v)} />
        <CardList filteredCards={filteredCards} />
      </>)}
    </AppWrapper>
    <Fab color="default" sx={{position: "fixed", bottom: 86, right: 16}} onClick={handleToggleSaveData}>
      {saveData ? <SaveDataOnIcon /> : <SaveDataOffIcon />}
    </Fab>
    <Fab color="primary" sx={{position: "fixed", bottom: 16, right: 16}} onClick={handleToggleDarkMode}>
      <ThemeIcon />
    </Fab>
    <Snackbar sx={{bottom: {xs: 160, sm: 24}}} key={snackbarMessage} open={isSnackbarOpen} autoHideDuration={2500} onClose={() => setIsSnackbarOpen(false)} message={snackbarMessage} />
    <LoadingDialog open={!ready} />
  </>);
}

export default App;
