import { useState, useMemo } from "react";
import { useChrononInfo } from "./data/chrononInfo";
import { CardList } from "./components/cardList";
import { LoadingDialog } from "./components/loadingDialog";
import { StarFilter, SeriesFilter } from "./components/filter";
import { Fab, Tooltip } from "@mui/material";
import { Brightness6Outlined as ThemeIcon } from "@mui/icons-material";
import { useDarkModeConfig } from "./theme/provider";
import styled from "@emotion/styled";

const AppWrapper = styled.div`
  padding: 16px;
  padding-bottom: 120px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

function App() {
  const {toggleDarkMode} = useDarkModeConfig();

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
    <Tooltip placement="left" arrow title="切換主題">
      <Fab color="primary" sx={{position: "fixed", bottom: 16, right: 16}} onClick={toggleDarkMode}>
        <ThemeIcon />
      </Fab>
    </Tooltip>
    <LoadingDialog open={!ready} />
  </>);
}

export default App;
