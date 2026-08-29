import { questData } from "../data/questData.js";
import { getTotalXP, addXP, LV_CAP } from "../utils/xpMath.js";
import { formatNumber } from "../utils/format.js";

export function renderXp(root) {
  const questOptions = Object.entries(questData)
    .map(([label, xp]) => `<option value="${xp}">${label}</option>`)
    .join("");

  root.innerHTML = `
    <div class="page-kanji">経</div>
    <h1>Kalkulator Experience</h1>
    <p class="lede">Hitung berapa kali quest/monster perlu diulang untuk mencapai level target.</p>

    <div class="card">
      <h2>Karakter Saat Ini</h2>
      <div class="card-sub">Level dan progres EXP kamu sekarang</div>
      <label for="level">Level</label>
      <input type="number" id="level" value="1" min="1" max="${LV_CAP}">
      <label for="level-percentage">Progres EXP di level ini (%)</label>
      <input type="number" id="level-percentage" value="0" min="0" max="99">
      <label for="target-level">Level Target</label>
      <input type="number" id="target-level" value="${LV_CAP}" min="1" max="${LV_CAP}">
    </div>

    <div class="card">
      <h2>Sumber EXP</h2>
      <div class="card-sub">Pilih preset atau isi manual</div>
      <label for="quest-name">Preset</label>
      <select id="quest-name">${questOptions}</select>
      <label for="quest-exp">EXP per run</label>
      <input type="number" id="quest-exp" value="15000000">
      <label for="quest-times">Sudah dijalankan berapa kali?</label>
      <input type="number" id="quest-times" value="0" min="0">

      <div class="result" id="result">
        <p>Butuh <strong id="r-times">-</strong> run untuk mencapai level target.</p>
        <p>Total EXP dibutuhkan: <strong class="mono" id="r-xp">-</strong></p>
        <p>Setelah <span id="r-times-val">0</span> run: level <strong id="r-cur-level">-</strong></p>
      </div>
    </div>
  `;

  const $ = (id) => root.querySelector(`#${id}`);

  function evaluate() {
    const lv = parseInt($("level").value, 10) || 1;
    const target = parseInt($("target-level").value, 10) || LV_CAP;
    const percentage = parseInt($("level-percentage").value, 10) || 0;
    const questXP = parseFloat($("quest-exp").value) || 0;
    const times = parseInt($("quest-times").value, 10) || 0;

    const xpRequired = getTotalXP(lv, percentage, target);
    const targetTimes = questXP > 0 ? Math.ceil(xpRequired / questXP) : 0;
    const [nLv, nLvP] = addXP(lv, percentage, questXP * times);

    $("r-times").textContent = targetTimes;
    $("r-xp").textContent = formatNumber(xpRequired);
    $("r-times-val").textContent = times;
    $("r-cur-level").textContent = `${nLv} (${nLvP}%)`;
  }

  $("quest-name").addEventListener("change", () => {
    $("quest-exp").value = $("quest-name").value;
    evaluate();
  });
  root.querySelectorAll("input").forEach((el) => el.addEventListener("input", evaluate));

  evaluate();
}
