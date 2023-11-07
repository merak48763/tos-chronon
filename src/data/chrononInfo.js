import { useState, useEffect, useRef, createContext, useContext } from "react";
import axios from "axios";

const ChrononInfoContext = createContext({});

const ChrononInfoProvider = ({children}) => {
  const [ready, setReady] = useState(false);
  const [cards, setCards] = useState([]);
  const [series, setSeries] = useState([]);
  const chrononCardRef = useRef(new Map());
  const chrononSeriesRef = useRef(new Map());

  useEffect(() => {
    axios.get("https://merak48763.github.io/tool_data/data/chronon.json")
    .then(res => {
      const modifiedCard = [];
      res.data.series.forEach(series => {
        chrononSeriesRef.current.set(series.id, {
          id: series.id,
          name: series.name,
          stars: new Map(series.stars.map(starData => [starData.star, starData]))
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

      setCards(modifiedCard);
      setSeries(res.data.series.map(series => ({
        id: series.id,
        name: series.name
      })));

      setReady(true);
    });
  }, []);

  const getCardById = id => chrononCardRef.current.get(id);
  const getSeriesNameById = id => chrononSeriesRef.current.get(id)?.name;

  return (
    <ChrononInfoContext.Provider value={{
      ready,
      cards,
      series,
      getCardById,
      getSeriesNameById
    }}>
      {children}
    </ChrononInfoContext.Provider>
  );
}

const useChrononInfo = () => useContext(ChrononInfoContext);

export { ChrononInfoProvider, useChrononInfo };
