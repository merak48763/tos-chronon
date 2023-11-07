const attr = id => ["無", "水", "火", "木", "光", "暗"][id];

function instantSkillDesc(skillId, args) {
  switch (skillId) {
    case 1:
      return `自身技能 CD -${args[0]}`;
    case 2:
      return `該回合增加 ${args[0]} 連擊 (Combo)`;
    case 3:
      return `自身進入 ${args[0]} 回合亢奮狀態`;
    case 4:
      return `自身攻擊力提升 ${args[0]}%`;
    case 5:
      return `全隊攻擊力提升 ${args[0]}%`;
    case 6:
      return `自身增加 ${args[0]} 回合亢奮狀態`;
    case 7:
      return `提升 ${args[0]}% 龍脈儀能量`;
    case 8:
      return `回復 ${args[0]} 點生命力`;
    case 9:
      return "完全回復生命力";
    case 10:
      return "解除自身疲憊狀態";
    case 11:
      return "解除自身風壓狀態";
    case 12:
      return "解除自身休眠狀態";
    default:
      return `CT_SKILL_INSTANT_${skillId}`;
  }
}

function statusSkillDesc(skillId, args) {
  switch (skillId) {
    case 1:
      return "自身不會被封鎖主動技能";
    case 2:
      return "隊伍不會被封鎖主動技能";
    case 3:
      return `自身以 ${args[0]}% 攻擊力追打${attr(args[2])}屬性攻擊 ${args[1]} 次`;
    case 4:
      return `所有成員以 ${args[0]}% 攻擊力追打${attr(args[2])}屬性攻擊 ${args[1]} 次`;
    case 5:
      return `所受自身屬性傷害減少 ${args[0]}%`;
    case 6:
      return `所受自身種族傷害減少 ${args[0]}%`;
    case 7:
      return `減少 ${args[0]}% 所受傷害`;
    case 8:
      return `迴避 ${attr(args[0])} 屬性敵人的攻擊`;
    case 9:
      return `將自身直行的符石轉化為${attr(args[0])}符石`;
    case 10:
      return `自身攻擊力提升 ${args[0]}%`;
    case 11:
      return `全隊攻擊力提升 ${args[0]}%`;
    case 12:
      return `自身回復力提升 ${args[0]}%`;
    case 13:
      return `全隊回復力提升 ${args[0]}%`;
    case 14:
      return `回復 ${args[0]} 點生命力`;
    case 15:
      return "自身無視「攻前盾」";
    case 16:
      return "自身無視「三屬盾」";
    case 17:
      return "自身無視「五屬盾」";
    case 18:
      return "自身無視「指定形狀盾」";
    case 19:
      return "自身無視「固定連擊盾」";
    case 20:
      return "自身無視「連擊相等盾」";
    case 21:
      return "自身無視「十字限盾」";
    case 22:
      return "自身無視「全消盾」";
    case 23:
      return "自身無視「反首消符石盾」";
    case 24:
      return "自身無視「符石連擊零化」";
    case 25:
      return "自身無視「指定連擊法印」";
    case 26:
      return "自身無視「起結有序」";
    case 27:
      return "無視「燃燒」";
    case 28:
      return "無視「黏腐」";
    case 29:
      return "觸碰「電擊符石」仍可移動符石";
    case 30:
      return "觸碰「暴風」仍可移動符石";
    case 31:
      return "觸碰「連環光牢」射擊位置仍可移動符石";
    case 32:
      return "無視「黑洞」";
    case 33:
      return "觸碰「爆破炸彈」不會受到傷害";
    case 34:
      return `「灼熱地型」傷害減少 ${args[0]}%`;
    case 35:
      return `自身技能 CD -${args[0]}`;
    case 36:
      return `自身增加 ${args[0]} EP`;
    case 37:
      return "自身無視指定減傷抗性敵技";
    case 38:
      return "隊伍不受「漆黑照明」、「漆黑結聚」技能影響";
    case 39:
      return `自身以 ${args[0]}% 攻擊力追打五屬性攻擊各 ${args[1]} 次`;
    case 40:
      return `所有成員以 ${args[0]}% 攻擊力追打五屬性攻擊各 ${args[1]} 次`;
    default:
      return `CT_SKILL_STATUS_${skillId}`;
  }
}

function triggeredSkillDesc(skillId, args) {
  switch (skillId) {
    case 1:
      return `自身攻擊力提升 ${args[0]}%`;
    case 2:
      return `自身以 ${args[0]}% 攻擊力追打${attr(args[2])}屬性攻擊 ${args[1]} 次`;
    case 3:
      return "自身無視「攻前盾」";
    case 4:
      return "自身無視「三屬盾」";
    case 5:
      return "自身無視「五屬盾」";
    case 6:
      return "自身無視「指定形狀盾」";
    case 7:
      return "自身無視「固定連擊盾」";
    case 8:
      return "自身無視「連擊相等盾」";
    case 9:
      return "自身無視「十字限盾」";
    case 10:
      return "自身無視「全消盾」";
    case 11:
      return "自身無視「反首消符石盾」";
    case 12:
      return "自身無視「符石連擊零化」";
    case 13:
      return "自身無視「指定連擊法印」";
    case 14:
      return "自身無視「起結有序」";
    case 15:
      return "自身無視指定減傷抗性敵技";
    case 16:
      return `自身技能 CD -${args[0]}`;
    case 17:
      return `自身增加 ${args[0]} EP`;
    case 18:
      return `自身以 ${args[0]}% 攻擊力追打五屬性攻擊各 ${args[1]} 次`;
    case 19:
      return "完全回復生命力";
    default:
      return `CT_SKILL_TRIGGERED_${skillId}`;
  }
}

export { instantSkillDesc, statusSkillDesc, triggeredSkillDesc };
