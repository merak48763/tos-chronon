import type { ChrononCard } from "./chrononInfo";

function union<T>(s1: Set<T>, s2: Set<T>) {
  const result = new Set(s1);
  s2?.forEach(v => result.add(v));
  return result;
}

function intersect<T>(s1: Set<T>, s2: Set<T>) {
  const result = new Set<T>();
  s1.forEach(v => {
    if(s2?.has(v)) {
      result.add(v);
    }
  });
  return result;
}

export interface FilterEngineParams {
  universe: Iterable<number>,
  starIndex: Map<number, Set<number>>,
  starFilter?: number[],
  seriesIndex: Map<number, Set<number>>,
  seriesFilter?: number[],
  abilityCategoryIndex: Map<number, Set<number>>,
  abilityCategoryFilter?: number[],
  sortingMethod?: SortingMethod,
  cardLookup: Map<number, ChrononCard>,
}

export const enum SortingMethod {
  BY_ID = 0,
  BY_STAR = 1,
}

export function filter({
    universe,
    starIndex, starFilter,
    seriesIndex, seriesFilter,
    abilityCategoryIndex, abilityCategoryFilter,
    sortingMethod, cardLookup,
  }: FilterEngineParams) {
  let result = new Set(universe);

  if(starFilter) {
    let stageResult = new Set<number>();
    starFilter.forEach(k => {
      stageResult = union(stageResult, starIndex.get(k)!);
    });
    result = intersect(result, stageResult);
  }

  if(seriesFilter) {
    let stageResult = new Set<number>();
    seriesFilter.forEach(k => {
      stageResult = union(stageResult, seriesIndex.get(k)!);
    });
    result = intersect(result, stageResult);
  }

  if(abilityCategoryFilter) {
    let stageResult = new Set<number>();
    abilityCategoryFilter.forEach(k => {
      stageResult = union(stageResult, abilityCategoryIndex.get(k)!);
    });
    result = intersect(result, stageResult);
  }

  return [...result].map(
    id => cardLookup.get(id)!
  ).sort(
    (a, b) => {
      if(sortingMethod === SortingMethod.BY_STAR && a.star != b.star) {
        return a.star - b.star;
      }
      return a.id - b.id;
    }
  );
}

export function computeSkillFilterId(groupIndex: number, cellIndex: number) {
  return 100 * groupIndex + cellIndex;
}
