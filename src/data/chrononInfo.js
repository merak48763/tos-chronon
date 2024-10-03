import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import axios from "axios";
import { filter, computeSkillFilterId } from "./filterEngine";
import skillFilterData from "./skillFilterConfig.json";

const groupedSkillFilterIds = skillFilterData.groups.map((group, i) => group.map((_, j) => computeSkillFilterId(i, j)));
const groupedSkillFilterNames = skillFilterData.groups.map(group => group.map(cell => cell.tag));

const ChrononInfoContext = createContext({});

const ChrononInfoProvider = ({children}) => {
  const [ready, setReady] = useState(false);
  const [cards, setCards] = useState([]);
  const [series, setSeries] = useState([]);
  const chrononCardRef = useRef(new Map());
  const chrononSeriesRef = useRef(new Map());

  const chrononStarIndex = useRef(new Map());
  const chrononSeriesIndex = useRef(new Map());
  const chrononAbilityCategoryIndex = useRef(new Map(groupedSkillFilterIds.flat().map(id => [id, new Set()])));

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

      const iSkillRevMap = new Map();
      const sSkillRevMap = new Map();
      const tSkillRevMap = new Map();
      skillFilterData.groups.forEach((group, i) => group.forEach((cell, j) => {
        const filterId = computeSkillFilterId(i, j);
        cell.values.i?.forEach(skillId => {
          if(!iSkillRevMap.has(skillId)) {
            iSkillRevMap.set(skillId, new Set());
          }
          iSkillRevMap.get(skillId).add(filterId);
        });
        cell.values.s?.forEach(skillId => {
          if(!sSkillRevMap.has(skillId)) {
            sSkillRevMap.set(skillId, new Set());
          }
          sSkillRevMap.get(skillId).add(filterId);
        });
        cell.values.t?.forEach(skillId => {
          if(!tSkillRevMap.has(skillId)) {
            tSkillRevMap.set(skillId, new Set());
          }
          tSkillRevMap.get(skillId).add(filterId);
        });
      }));

      modifiedCard.forEach(card => {
        if(!chrononStarIndex.current.has(card.star)) {
          chrononStarIndex.current.set(card.star, new Set());
        }
        chrononStarIndex.current.get(card.star).add(card.id);

        if(!chrononSeriesIndex.current.has(card.series)) {
          chrononSeriesIndex.current.set(card.series, new Set());
        }
        chrononSeriesIndex.current.get(card.series).add(card.id);

        card.instantSkill.forEach(levelSet => levelSet.forEach(instance => {
          if(iSkillRevMap.has(instance.skill)) {
            iSkillRevMap.get(instance.skill).forEach(filterId => {
              chrononAbilityCategoryIndex.current.get(filterId).add(card.id);
            });
          }
        }));
        card.statusSkill.forEach(levelSet => levelSet.forEach(instance => {
          if(sSkillRevMap.has(instance.skill)) {
            sSkillRevMap.get(instance.skill).forEach(filterId => {
              chrononAbilityCategoryIndex.current.get(filterId).add(card.id);
            });
          }
        }));
        card.triggeredSkill.forEach(levelSet => levelSet.forEach(instance => {
          if(tSkillRevMap.has(instance.skill)) {
            tSkillRevMap.get(instance.skill).forEach(filterId => {
              chrononAbilityCategoryIndex.current.get(filterId).add(card.id);
            });
          }
        }));
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
  const cardFilter = useCallback(({seriesFilter, starFilter, abilityCategoryFilter}) => filter({
    universe: cards.map(c => c.id),
    seriesFilter, seriesIndex: chrononSeriesIndex.current,
    starFilter, starIndex: chrononStarIndex.current,
    abilityCategoryFilter, abilityCategoryIndex: chrononAbilityCategoryIndex.current
  }).map(id => chrononCardRef.current.get(id)), [cards]);  // TODO: add sorting method option

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

export { ChrononInfoProvider, useChrononInfo, groupedSkillFilterIds, groupedSkillFilterNames };
