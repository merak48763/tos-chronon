import skillFilterData from "./skillFilterConfig.json";

function union(s1, s2) {
  const result = new Set(s1);
  s2?.forEach(v => result.add(v));
  return result;
}

function intersect(s1, s2) {
  const result = new Set();
  s1.forEach(v => {
    if(s2?.has(v)) {
      result.add(v);
    }
  });
  return result;
}

function filter({
    universe,
    starIndex, starFilter,
    seriesIndex, seriesFilter,
    abilityCategoryFilter
  }) {
  let result = new Set(universe);

  if(starFilter) {
    let stageResult = new Set();
    starFilter.forEach(k => {
      stageResult = union(stageResult, starIndex.get(k));
    });
    result = intersect(result, stageResult);
  }

  if(seriesFilter) {
    let stageResult = new Set();
    seriesFilter.forEach(k => {
      stageResult = union(stageResult, seriesIndex.get(k));
    });
    result = intersect(result, stageResult);
  }

  return [...result].sort((a, b) => a - b);
}

const groupedSkillFilterIds = skillFilterData.groups.map((group, i) => group.map((_, j) => 100*i+j));
const groupedSkillFilterNames = skillFilterData.groups.map(group => group.map(cell => cell.tag));

export { filter, groupedSkillFilterIds, groupedSkillFilterNames };
