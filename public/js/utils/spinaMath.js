// Ported from the original spina.html: spina = (rate/100) * idr * 1000
export function idrToSpina(rate, idr) {
  return Math.round((rate / 100) * idr * 1000);
}

// Inverse of the formula above — used by the Skip-MQ calculator to turn a
// known Spina cost into the IDR the player needs to spend at a given rate.
export function spinaToIDR(rate, spina) {
  if (!rate) return 0;
  return Math.round(spina / (rate * 10));
}

// Skip-MQ pricing rule: 1 quest/bos di dalam Main Quest = 500.000 spina.
// Setiap bab (chapter) berisi beberapa bos — total biaya dihitung dari
// jumlah bos yang ada di rentang bab yang dipilih (bab 1 s.d. bab
// terakhir/"tamat", rentang bebas dipilih user), BUKAN dari jumlah bab-nya.
export const SPINA_PER_BOSS = 500000;

export function bossesSkippedCost(bossCount) {
  return Math.max(0, bossCount) * SPINA_PER_BOSS;
}
