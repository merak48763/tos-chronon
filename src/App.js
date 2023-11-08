import { useState, useMemo } from "react";
import { useChrononInfo } from "./data/chrononInfo";
import { CardList } from "./components/cardList";
import { LoadingDialog } from "./components/loadingDialog";
import { StarFilter, SeriesFilter } from "./components/filter";
import { Fab, Tooltip } from "@mui/material";
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

const MultiLineText = styled.span`
  white-space: pre-wrap;
`;

function App() {
  const {darkMode, toggleDarkMode, saveData, toggleSaveData} = useConfig();

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
    <Tooltip placement="left" arrow title={(
      <MultiLineText>{`${saveData ? "允許" : "禁止"}卡圖預先載入\n現在：${saveData ? "禁止" : "允許"}`}</MultiLineText>
    )}>
      <Fab color="default" sx={{position: "fixed", bottom: 86, right: 16}} onClick={toggleSaveData}>
        {saveData ? <SaveDataOnIcon /> : <SaveDataOffIcon />}
      </Fab>
    </Tooltip>
    <Tooltip placement="left" arrow title={(
      <MultiLineText>{`切換主題\n現在：${darkMode ? "深色" : "淺色"}`}</MultiLineText>
    )}>
      <Fab color="primary" sx={{position: "fixed", bottom: 16, right: 16}} onClick={toggleDarkMode}>
        <ThemeIcon />
      </Fab>
    </Tooltip>
    <LoadingDialog open={!ready} />
  </>);
}

export default App;
