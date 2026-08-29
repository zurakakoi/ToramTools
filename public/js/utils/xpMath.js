// Level <-> XP math. Ported 1:1 from the original js/xp.js so results stay
// identical to the old calculator.
export const LV_CAP = 305;

const { floor, ceil } = Math;

// XP required to go from level `lv` to `lv + 1`.
export function getXP(lv) {
  return floor(0.025 * lv ** 4 + 2 * lv);
}

// Total XP needed to go from (begin, beginPercentage%) up to `end`.
export function getTotalXP(begin, beginPercentage, end) {
  let xp = floor((1 - beginPercentage / 100) * getXP(begin));
  for (let i = begin + 1; i < end; i++) {
    xp += getXP(i);
  }
  return xp;
}

// Apply `extraXP` on top of (begin, beginPercentage%), return [newLevel, newPercentage].
export function addXP(begin, beginPercentage, extraXP) {
  let remainingXP = extraXP;
  let lv;
  let lvPercentage;

  const xpRequiredNextLv = (1 - beginPercentage / 100) * getXP(begin);

  if (extraXP < xpRequiredNextLv) {
    const currentXP = (beginPercentage / 100) * getXP(begin) + extraXP;
    return [begin, floor((100 * currentXP) / getXP(begin))];
  }

  remainingXP -= xpRequiredNextLv;
  lv = begin + 1;
  while (getXP(lv) <= remainingXP) {
    remainingXP -= getXP(lv);
    lv += 1;
  }
  lvPercentage = floor((100 * remainingXP) / getXP(lv));
  return [lv, lvPercentage];
}

export function runsToReachTarget(mqXpPerRun, targetXp) {
  return ceil(targetXp / mqXpPerRun);
}
