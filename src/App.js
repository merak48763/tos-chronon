import { useState, useMemo } from "react";
import { useChrononInfo } from "./data/chrononInfo";
import { CardList } from "./components/cardList";
import { LoadingDialog } from "./components/loadingDialog";
import { StarFilter, SeriesFilter } from "./components/filter";
import styled from "@emotion/styled";

const AppWrapper = styled.div`
  padding: 16px;
  padding-bottom: 120px;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
`;

function App() {
  const {ready, filter} = useChrononInfo();
  const [starFilter, setStarFilter] = useState([]);
  const [starFilterActive, setStarFilterActive] = useState(false);
  const [seriesFilter, setSeriesFilter] = useState([]);
  const [seriesFilterActive, setSeriesFilterActive] = useState(false);

  const filteredCards = useMemo(() => filter({
    seriesFilter: (seriesFilter.length > 0 && seriesFilterActive) ? seriesFilter : null,
    starFilter: (starFilter.length > 0 && starFilterActive) ? starFilter : null,
  }), [seriesFilter, seriesFilterActive, starFilter, starFilterActive, filter]);

  return (
    <AppWrapper>
      {ready && (<>
        <SeriesFilter value={seriesFilter} onChange={v => setSeriesFilter(v)} active={seriesFilterActive} onToggle={v => setSeriesFilterActive(v)} />
        <StarFilter value={starFilter} onChange={v => setStarFilter(v)} active={starFilterActive} onToggle={v => setStarFilterActive(v)} />
        <CardList filteredCards={filteredCards} />
      </>)}
      <LoadingDialog open={!ready} />
    </AppWrapper>
  );
}

export default App;
