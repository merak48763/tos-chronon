import { InlineTypography } from "../components/inlineTypography";

const A = id => ["無", "水", "火", "木", "光", "暗"][id];
const R = id => [null, "人類", "獸類", "妖精", "龍類", "神族", null, null, "魔族", null, "機械族"][id];

const ISTranslator = new Map([
  [1, ([v0]) => <>自身技能 CD -{v0}</>],
  [2, ([v0]) => <>該回合增加 {v0} 連擊 (Combo)</>],
  [3, ([v0]) => <>自身進入 {v0} 回合亢奮狀態</>],
  [4, ([v0]) => <>自身攻擊力提升 {v0}%</>],
  [5, ([v0]) => <>全隊攻擊力提升 {v0}%</>],
  [6, ([v0]) => <>自身增加 {v0} 回合亢奮狀態</>],
  [7, ([v0]) => <>提升 {v0}% 龍脈儀能量</>],
  [8, ([v0]) => <>回復 {v0} 點生命力</>],
  [9, () => "完全回復生命力"],
  [10, () => "解除自身疲憊狀態"],
  [11, () => "解除自身風壓狀態"],
  [12, () => "解除自身休眠狀態"],
  [13, ([v0, v1]) => <>自身為{R(v1)}成員，自身技能 CD -{v0}</>],
  [14, ([v0, v1]) => <>自身為{A(v1)}屬性成員，自身技能 CD -{v0}</>],
  [15, () => "解除自身被封鎖的技能 (此技能無視封鎖技能)"],
  [16, ([v0, v1, v2]) => <>發動攻擊前自身對敵方全體造成 {v0} 點{A(v2)}屬性傷害 {v1} 次</>],
  [17, ([v0]) => <>自身增加 {v0} 回合暴擊狀態</>],
  [18, ([v0]) => <>自身增加 {v0} 回合暴怒狀態</>],
  [19, ([v0]) => <>自身增加 {v0} 回合神選狀態</>]
]);
function instantSkillDesc(skillId, args) {
  return ISTranslator.get(skillId)?.(args) ?? `CT_SKILL_INSTANT_${skillId}`;
}
function instantSkillDescWithMark(skillId, args, marks) {
  // Currently incompatible with the A function if the attribute is changed
  return instantSkillDesc(skillId, args.map((arg, i) => marks[i] ? <InlineTypography color="primary">{arg}</InlineTypography> : arg));
}

const SSTranslator = new Map([
  [1, () => "自身不會被封鎖主動技能"],
  [2, () => "隊伍不會被封鎖主動技能"],
  [3, ([v0, v1, v2]) => <>自身以 {v0}% 攻擊力追打{A(v2)}屬性攻擊 {v1} 次</>],
  [4, ([v0, v1, v2]) => <>所有成員以 {v0}% 攻擊力追打{A(v2)}屬性攻擊 {v1} 次</>],
  [5, ([v0]) => <>所受自身屬性傷害減少 {v0}%</>],
  [6, ([v0]) => <>所受自身種族傷害減少 {v0}%</>],
  [7, ([v0]) => <>減少 {v0}% 所受傷害</>],
  [8, ([v0]) => <>迴避 {A(v0)} 屬性敵人的攻擊</>],
  [9, ([v0]) => <>將自身直行的符石轉化為{A(v0)}符石</>],
  [10, ([v0]) => <>自身攻擊力提升 {v0}%</>],
  [11, ([v0]) => <>全隊攻擊力提升 {v0}%</>],
  [12, ([v0]) => <>自身回復力提升 {v0}%</>],
  [13, ([v0]) => <>全隊回復力提升 {v0}%</>],
  [14, ([v0]) => <>回復 {v0} 點生命力</>],
  [15, () => "自身無視「攻前盾」"],
  [16, () => "自身無視「三屬盾」"],
  [17, () => "自身無視「五屬盾」"],
  [18, () => "自身無視「指定形狀盾」"],
  [19, () => "自身無視「固定連擊盾」"],
  [20, () => "自身無視「連擊相等盾」"],
  [21, () => "自身無視「十字限盾」"],
  [22, () => "自身無視「全消盾」"],
  [23, () => "自身無視「反首消符石盾」"],
  [24, () => "自身無視「符石連擊零化」"],
  [25, () => "自身無視「指定連擊法印」"],
  [26, () => "自身無視「起結有序」"],
  [27, () => "無視「燃燒」"],
  [28, () => "無視「黏腐」"],
  [29, () => "觸碰「電擊符石」仍可移動符石"],
  [30, () => "觸碰「暴風」仍可移動符石"],
  [31, () => "觸碰「連環光牢」射擊位置仍可移動符石"],
  [32, () => "無視「黑洞」"],
  [33, () => "觸碰「爆破炸彈」不會受到傷害"],
  [34, ([v0]) => <>「灼熱地型」傷害減少 {v0}%</>],
  [35, ([v0]) => <>自身技能 CD -{v0}</>],
  [36, ([v0]) => <>自身增加 {v0} EP</>],
  [37, () => "自身無視指定減傷抗性敵技"],
  [38, () => "隊伍不受「漆黑照明」、「漆黑結聚」技能影響"],
  [39, ([v0, v1]) => <>自身以 {v0}% 攻擊力追打五屬性攻擊各 {v1} 次</>],
  [40, ([v0, v1]) => <>所有成員以 {v0}% 攻擊力追打五屬性攻擊各 {v1} 次</>],
  [41, () => "自身無視「二屬盾」、「三屬盾」、「四屬盾」及「五屬盾」"],
  [42, ([v0]) => <>增加 {v0} 連擊 (Combo)</>],
  [43, () => "迴避每個敵人的首次攻擊"],
  [44, () => "迴避所有敵人攻擊"]
]);
function statusSkillDesc(skillId, args) {
  return SSTranslator.get(skillId)?.(args) ?? `CT_SKILL_STATUS_${skillId}`;
}
function statusSkillDescWithMark(skillId, args, marks) {
  // Currently incompatible with the A function if the attribute is changed
  return statusSkillDesc(skillId, args.map((arg, i) => marks[i] ? <InlineTypography color="primary">{arg}</InlineTypography> : arg));
}

const TSTranslator = new Map([
  [1, ([v0]) => <>自身攻擊力提升 {v0}%</>],
  [2, ([v0, v1, v2]) => <>自身以 {v0}% 攻擊力追打{A(v2)}屬性攻擊 {v1} 次</>],
  [3, () => "自身無視「攻前盾」"],
  [4, () => "自身無視「三屬盾」"],
  [5, () => "自身無視「五屬盾」"],
  [6, () => "自身無視「指定形狀盾」"],
  [7, () => "自身無視「固定連擊盾」"],
  [8, () => "自身無視「連擊相等盾」"],
  [9, () => "自身無視「十字限盾」"],
  [10, () => "自身無視「全消盾」"],
  [11, () => "自身無視「反首消符石盾」"],
  [12, () => "自身無視「符石連擊零化」"],
  [13, () => "自身無視「指定連擊法印」"],
  [14, () => "自身無視「起結有序」"],
  [15, () => "自身無視指定減傷抗性敵技"],
  [16, ([v0]) => <>自身技能 CD -{v0}</>],
  [17, ([v0]) => <>自身增加 {v0} EP</>],
  [18, ([v0, v1]) => <>自身以 {v0}% 攻擊力追打五屬性攻擊各 {v1} 次</>],
  [19, () => "完全回復生命力"],
  [20, ([v0, v1]) => <>回合結束時，<br />將單數直行的符石轉化為{A(v0)}強化符石，<br />將雙數直行的符石轉化為{A(v1)}強化符石</>],
  [21, ([v0, v1]) => <>回合結束時，<br />將單數橫行的符石轉化為{A(v0)}強化符石，<br />將雙數橫行的符石轉化為{A(v1)}強化符石</>],
  [22, () => "自身無視「首消粒數盾」"],
  [23, () => "自身無視「首消屬性組數符石盾」"],
  [24, () => "自身無視「首消相同種類盾」"],
  [25, () => "自身無視「首消不同種類盾」"],
  [26, ([v0]) => <>自身擊中敵人後凍結敵人，持續 {v0} 回合</>],
  [27, ([v0]) => <>自身擊中敵人後點燃敵人，持續 {v0} 回合</>],
  [28, ([v0]) => <>自身擊中敵人後石化敵人，持續 {v0} 回合</>],
  [29, ([v0]) => <>自身擊中敵人後電擊敵人，持續 {v0} 回合</>],
  [30, ([v0]) => <>自身擊中敵人後冥控敵人，持續 {v0} 回合</>],
  [31, ([v0]) => <>自身擊中敵人後使敵人被寄生，持續 {v0} 回合</>],
  [32, ([v0]) => <>自身擊中敵人後使敵人中毒，持續 {v0} 回合</>],
  [33, ([v0]) => <>自身擊中敵人後使敵人身中烈毒，持續 {v0} 回合</>],
  [34, ([v0]) => <>自身擊中敵人後魅惑敵人，持續 {v0} 回合</>],
  [35, ([v0]) => <>自身擊中敵人後暈擊敵人，持續 {v0} 回合</>],
  [36, ([v0]) => <>自身擊中敵人後使敵人進入睡眠狀態，持續 {v0} 回合</>],
  [37, ([v0]) => <>自身擊中敵人後使敵人置身刀傷狀態，持續 {v0} 回合</>],
  [38, ([v0, v1]) => <>自身擊中敵人後使敵人轉為{A(v0)}屬性，持續 {v1} 回合</>],
  [39, ([v0]) => <>敵人行動 CD +{v0}</>]
]);
function triggeredSkillDesc(skillId, args) {
  return TSTranslator.get(skillId)?.(args) ?? `CT_SKILL_TRIGGERED_${skillId}`;
}
function triggeredSkillDescWithMark(skillId, args, marks) {
  // Currently incompatible with the A function if the attribute is changed
  return triggeredSkillDesc(skillId, args.map((arg, i) => marks[i] ? <InlineTypography color="primary">{arg}</InlineTypography> : arg));
}

function toRomanNumerical(num) {
  if(isNaN(num)) {
    return NaN;
  }
  const digits = (+num).toString().split("");
  const keys = [
    "", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
    "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
    "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"
  ];
  let result = "";
  for(let i=2; i>=0; --i) {
    result = (keys[parseInt(digits.pop()) + i*10] ?? "") + result;
  }
  return result;
}

export {
  instantSkillDesc, instantSkillDescWithMark,
  statusSkillDesc, statusSkillDescWithMark,
  triggeredSkillDesc, triggeredSkillDescWithMark,
  toRomanNumerical
};
