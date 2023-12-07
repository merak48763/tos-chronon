import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import axios from "axios";
import { filter } from "./filterEngine";

const ChrononInfoContext = createContext({});

const ChrononInfoProvider = ({children}) => {
  const [ready, setReady] = useState(false);
  const [cards, setCards] = useState([]);
  const [series, setSeries] = useState([]);
  const chrononCardRef = useRef(new Map());
  const chrononSeriesRef = useRef(new Map());

  const chrononStarIndex = useRef(new Map());
  const chrononSeriesIndex = useRef(new Map());

  useEffect(() => {
    axios.get("https://merak48763.github.io/tool_data/data/chronon.json")
    .then(res => {
      const modifiedCard = [];
      res.data.series.forEach(series => {
        chrononSeriesRef.current.set(series.id, {
          id: series.id,
          name: series.name,
          stars: new Map(series.stars.map(starData => [starData.star, starData])),
          marbel: series.marbel
        });
      });
      res.data.card.forEach(card => {
        const cardCommonData = chrononSeriesRef.current.get(card.series).stars.get(card.star);
        card = {
          ...card,
          ...cardCommonData
        };
        modifiedCard.push(card);
        chrononCardRef.current.set(card.id, card);
      });

      modifiedCard.forEach(card => {
        if(!chrononStarIndex.current.has(card.star)) {
          chrononStarIndex.current.set(card.star, new Set());
        }
        chrononStarIndex.current.get(card.star).add(card.id);

        if(!chrononSeriesIndex.current.has(card.series)) {
          chrononSeriesIndex.current.set(card.series, new Set());
        }
        chrononSeriesIndex.current.get(card.series).add(card.id);
      });

      setCards(modifiedCard);
      setSeries(res.data.series.map(series => ({
        id: series.id,
        name: series.name
      })));

      setReady(true);
    });
  }, []);

  const getCardById = useCallback(id => chrononCardRef.current.get(id), []);
  const getSeriesNameById = useCallback(id => chrononSeriesRef.current.get(id)?.name, []);
  const getSeriesMarbelById = useCallback(id => chrononSeriesRef.current.get(id)?.marbel, []);
  const cardFilter = useCallback(({seriesFilter, starFilter}) => filter({
    universe: cards.map(c => c.id),
    seriesFilter, seriesIndex: chrononSeriesIndex.current,
    starFilter, starIndex: chrononStarIndex.current
  }).map(id => chrononCardRef.current.get(id)), [cards]);

  return (
    <ChrononInfoContext.Provider value={{
      ready,
      cards,
      series,
      getCardById,
      getSeriesNameById,
      getSeriesMarbelById,
      filter: cardFilter
    }}>
      {children}
    </ChrononInfoContext.Provider>
  );
}

const useChrononInfo = () => useContext(ChrononInfoContext);

export { ChrononInfoProvider, useChrononInfo };
