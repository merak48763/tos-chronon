export interface FetchedChrononData {
  card: FetchedCard[],
  series: FetchedSeries[],
}

export interface FetchedCard {
  /**
   * global unique card ID
   */
  id: number,
  /**
   * series ID
   */
  series: number,
  /**
   * card ID within the series
   */
  scid: number,
  name: string,
  nameEn: string,
  star: number,
  maxLevel: number,
  fpConsume: number,
  instantSkill: ChrononSkill[][],
  statusSkill: ChrononSkill[][],
  triggeredSkill: ChrononSkill[][],
}

export interface ChrononSkill {
  skill: number,
  args?: number[],
}

export interface FetchedSeries {
  id: number,
  name: string,
  stars: StarData[],
  marbel: string,
}

export interface StarData {
  star: number,
  exp: number[],
  // attack: number[],
  // recover: number[],
  maxFp: number[],
  initFp: number[],
  fpCharge: number[],
}
