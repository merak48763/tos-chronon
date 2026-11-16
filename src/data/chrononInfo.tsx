import axios from "axios";
import type { FC, PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

import type { FetchedCard, FetchedChrononData, FetchedSeries, StarData } from "./fetchedData";
import type { FilterEngineParams } from "./filterEngine";
import { computeSkillFilterId, filter } from "./filterEngine";
import skillFilterData from "./skillFilterConfig.json";

export interface ChrononCard extends FetchedCard, StarData {}
export interface ChrononSeries extends Omit<FetchedSeries, "stars"> {
  stars: Map<number, StarData>;
}
export type SimplifiedSeries = Pick<FetchedSeries, "id" | "name">;

export const groupedSkillFilterIds = skillFilterData.groups.map((group, i) =>
  group.map((_, j) => computeSkillFilterId(i, j))
);
export const groupedSkillFilterNames = skillFilterData.groups.map(group => group.map(cell => cell.tag));

interface ChrononInfoContextValue {
  readonly ready: boolean;
  readonly cards: ChrononCard[];
  readonly series: SimplifiedSeries[];
  getCardById: (id: number) => ChrononCard | undefined;
  getSeriesNameById: (id: number) => string | undefined;
  getSeriesMarbelById: (id: number) => string | undefined;
  filter: (params: FilterParams) => ChrononCard[];
}

const ChrononInfoContext = createContext<ChrononInfoContextValue>({
  ready: false,
  cards: [],
  series: [],
  getCardById: () => undefined,
  getSeriesNameById: () => undefined,
  getSeriesMarbelById: () => undefined,
  filter: () => [],
});

export type FilterParams = Pick<
  FilterEngineParams,
  "seriesFilter" | "starFilter" | "abilityCategoryFilter" | "sortingMethod"
>;

export const ChrononInfoProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [cards, setCards] = useState([] as ChrononCard[]);
  const [series, setSeries] = useState([] as SimplifiedSeries[]);
  /**
   * card ID → card data
   */
  const chrononCardRef = useRef(new Map<number, ChrononCard>());
  /**
   * series ID → series data
   */
  const chrononSeriesRef = useRef(new Map<number, ChrononSeries>());

  /**
   * star → {card ID}
   */
  const chrononStarIndex = useRef(new Map<number, Set<number>>());
  const chrononSeriesIndex = useRef(new Map());
  /**
   * filter ID → {card ID}
   */
  const chrononAbilityCategoryIndex = useRef(new Map(groupedSkillFilterIds.flat().map(id => [id, new Set<number>()])));

  useEffect(() => {
    axios.get<FetchedChrononData>("https://merak48763.github.io/tool_data/data/chronon.json")
      .then(res => {
        const modifiedCards = [] as ChrononCard[];
        res.data.series.forEach(series => {
          chrononSeriesRef.current.set(series.id, {
            id: series.id,
            name: series.name,
            stars: new Map(series.stars.map(starData => [starData.star, starData])),
            marbel: series.marbel,
          });
        });
        res.data.card.forEach(card => {
          const cardCommonData = chrononSeriesRef.current.get(card.series)!.stars.get(card.star)!;
          const modifiedCard: ChrononCard = {
            ...card,
            ...cardCommonData,
          };
          modifiedCards.push(modifiedCard);
          chrononCardRef.current.set(card.id, modifiedCard);
        });

        const iSkillRevMap = new Map<number, Set<number>>();
        const sSkillRevMap = new Map<number, Set<number>>();
        const tSkillRevMap = new Map<number, Set<number>>();
        skillFilterData.groups.forEach((group, i) => group.forEach((cell, j) => {
          const filterId = computeSkillFilterId(i, j);
          cell.values.i?.forEach(skillId => {
            if (!iSkillRevMap.has(skillId)) {
              iSkillRevMap.set(skillId, new Set());
            }
            iSkillRevMap.get(skillId)!.add(filterId);
          });
          cell.values.s?.forEach(skillId => {
            if (!sSkillRevMap.has(skillId)) {
              sSkillRevMap.set(skillId, new Set());
            }
            sSkillRevMap.get(skillId)!.add(filterId);
          });
          cell.values.t?.forEach(skillId => {
            if (!tSkillRevMap.has(skillId)) {
              tSkillRevMap.set(skillId, new Set());
            }
            tSkillRevMap.get(skillId)!.add(filterId);
          });
        }));

        modifiedCards.forEach(card => {
          if (!chrononStarIndex.current.has(card.star)) {
            chrononStarIndex.current.set(card.star, new Set());
          }
          chrononStarIndex.current.get(card.star)!.add(card.id);

          if (!chrononSeriesIndex.current.has(card.series)) {
            chrononSeriesIndex.current.set(card.series, new Set());
          }
          chrononSeriesIndex.current.get(card.series).add(card.id);

          card.instantSkill.forEach(levelSet => levelSet.forEach(instance => {
            iSkillRevMap.get(instance.skill)?.forEach(filterId => {
              chrononAbilityCategoryIndex.current.get(filterId)?.add(card.id);
            });
          }));
          card.statusSkill.forEach(levelSet => levelSet.forEach(instance => {
            sSkillRevMap.get(instance.skill)?.forEach(filterId => {
              chrononAbilityCategoryIndex.current.get(filterId)?.add(card.id);
            });
          }));
          card.triggeredSkill.forEach(levelSet => levelSet.forEach(instance => {
            tSkillRevMap.get(instance.skill)?.forEach(filterId => {
              chrononAbilityCategoryIndex.current.get(filterId)?.add(card.id);
            });
          }));
        });

        setCards(modifiedCards);
        setSeries(res.data.series.map(series => ({
          id: series.id,
          name: series.name,
        })));

        setReady(true);
      });
  }, []);

  const getCardById = useCallback(
    (id: number) => chrononCardRef.current.get(id),
    [],
  );
  const getSeriesNameById = useCallback(
    (id: number) => chrononSeriesRef.current.get(id)?.name,
    [],
  );
  const getSeriesMarbelById = useCallback(
    (id: number) => chrononSeriesRef.current.get(id)?.marbel,
    [],
  );

  const cardFilter = useCallback(
    ({ seriesFilter, starFilter, abilityCategoryFilter, sortingMethod }: FilterParams) => filter({
      universe: cards.map(c => c.id),
      seriesFilter,
      seriesIndex: chrononSeriesIndex.current,
      starFilter,
      starIndex: chrononStarIndex.current,
      abilityCategoryFilter,
      abilityCategoryIndex: chrononAbilityCategoryIndex.current,
      sortingMethod,
      cardLookup: chrononCardRef.current,
    }),
    [cards],
  );

  return (
    <ChrononInfoContext.Provider
      value={{
        ready,
        cards,
        series,
        getCardById,
        getSeriesNameById,
        getSeriesMarbelById,
        filter: cardFilter,
      }}
    >
      {children}
    </ChrononInfoContext.Provider>
  );
};

export const useChrononInfo = () => useContext(ChrononInfoContext);
