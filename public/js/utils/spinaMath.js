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

// Skip-MQ pricing rule: 1 chapter (bab) di-skip = 500.000 spina, dan
// berlaku kelipatan linear per jumlah bab yang dilewati (termasuk bab akhir).
export const SPINA_PER_CHAPTER = 500000;

export function chaptersSkippedCost(fromChapter, toChapter) {
  const count = toChapter - fromChapter + 1;
  return Math.max(0, count) * SPINA_PER_CHAPTER;
}
