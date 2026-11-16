import { useState, useEffect, useMemo } from "react";
import { Fab, Snackbar } from "@mui/material";
import {
  Brightness6Outlined as ThemeIcon,
  DataSaverOffOutlined as SaveDataOffIcon,
  DataSaverOnOutlined as SaveDataOnIcon
} from "@mui/icons-material";
import styled from "@emotion/styled";

import { CardList } from "./components/cardList";
import { useConfig } from "./config/provider";
import { StarFilter, SeriesFilter, AbilityCategoryFilter } from "./components/filter";
import { LoadingDialog } from "./components/loadingDialog";
import { useChrononInfo } from "./data/chrononInfo";
import { SortingMethod } from "./data/filterEngine";

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
  const [starFilter, setStarFilter] = useState([] as number[]);
  const [starFilterActive, setStarFilterActive] = useState(false);
  const [seriesFilter, setSeriesFilter] = useState([] as number[]);
  const [seriesFilterActive, setSeriesFilterActive] = useState(false);
  const [abilityCategoryFilter, setAbilityCategoryFilter] = useState([] as number[]);
  const [abilityCategoryFilterActive, setAbilityCategoryFilterActive] = useState(false);

  const [sortingMethod, setSortingMethod] = useState(SortingMethod.BY_ID);

  const filteredCards = useMemo(() => filter({
    seriesFilter: (seriesFilter.length > 0 && seriesFilterActive) ? seriesFilter : undefined,
    starFilter: (starFilter.length > 0 && starFilterActive) ? starFilter : undefined,
    abilityCategoryFilter: (abilityCategoryFilter.length > 0 && abilityCategoryFilterActive) ? abilityCategoryFilter : undefined,
    sortingMethod
  }), [seriesFilter, seriesFilterActive, starFilter, starFilterActive, abilityCategoryFilter, abilityCategoryFilterActive, sortingMethod, filter]);

  return (<>
    <AppWrapper>
      {ready && (<>
        {/*<SeriesFilter value={seriesFilter} onChange={v => setSeriesFilter(v)} active={seriesFilterActive} onToggle={v => setSeriesFilterActive(v)} />*/}
        <StarFilter value={starFilter} onChange={v => setStarFilter(v)} active={starFilterActive} onToggle={v => setStarFilterActive(v)} />
        <AbilityCategoryFilter value={abilityCategoryFilter} onChange={v => setAbilityCategoryFilter(v)} active={abilityCategoryFilterActive} onToggle={v => setAbilityCategoryFilterActive(v)} />
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
