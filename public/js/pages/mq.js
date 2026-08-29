import { buildChapters } from "../data/mqData.js";
import { addXP, LV_CAP } from "../utils/xpMath.js";
import { formatNumber } from "../utils/format.js";
import { bossesSkippedCost, spinaToIDR } from "../utils/spinaMath.js";

const chapters = buildChapters();

function chapterOptions() {
  return chapters
    .map((c) => `<option value="${c.chapter}">Bab ${c.chapter}</option>`)
    .join("");
}

function sumXp(fromChapter, toChapter) {
  return chapters
    .filter((c) => c.chapter >= fromChapter && c.chapter <= toChapter)
    .reduce((sum, c) => sum + c.totalXp, 0);
}

// Jumlah bos/quest di dalam rentang bab yang dipilih — ini basis biaya
// Spina, bukan jumlah babnya.
function countBosses(fromChapter, toChapter) {
  return chapters
    .filter((c) => c.chapter >= fromChapter && c.chapter <= toChapter)
    .reduce((sum, c) => sum + c.quests.length, 0);
}

export function renderMq(root) {
  root.innerHTML = `
    <div class="page-kanji">討</div>
    <h1>MQ &amp; Skip MQ Calculator</h1>
    <p class="lede">Pilih rentang bab Main Quest, lihat EXP/Level yang didapat, atau hitung biaya untuk skip-nya pakai Spina.</p>

    <div class="tabs">
      <button class="tab-btn active" data-tab="mq">MQ Calculator</button>
      <button class="tab-btn" data-tab="skip">Skip MQ pakai Spina</button>
    </div>

    <!-- Shared: character state + chapter range -->
    <div class="card">
      <h2>Karakter &amp; Rentang Bab</h2>
      <div class="card-sub">Dipakai oleh kedua mode di atas</div>
      <label for="level">Level saat ini</label>
      <input type="number" id="level" value="1" min="1" max="${LV_CAP}">
      <label for="level-percentage">Progres EXP di level ini (%)</label>
      <input type="number" id="level-percentage" value="0" min="0" max="99">
      <label for="from-chapter">Dari Bab</label>
      <select id="from-chapter">${chapterOptions()}</select>
      <label for="to-chapter">Sampai Bab</label>
      <select id="to-chapter">${chapterOptions()}</select>
    </div>

    <!-- Tab: MQ Calculator -->
    <div class="tab-panel active" id="panel-mq">
      <div class="card">
        <h2>Hasil</h2>
        <div class="result" id="mq-result">
          <p>Total EXP dari bab ini: <strong class="mono" id="mq-xp">-</strong></p>
          <p>Setelah menyelesaikan bab tersebut, level kamu: <strong id="mq-level">-</strong></p>
        </div>
      </div>
    </div>

    <!-- Tab: Skip MQ pakai Spina -->
    <div class="tab-panel" id="panel-skip">
      <div class="card">
        <h2>Biaya Skip</h2>
        <div class="card-sub">500.000 Spina per bos, dihitung dari jumlah bos di dalam rentang bab yang dipilih</div>
        <label for="skip-rate">Rate (Contoh: 136)</label>
        <input type="number" id="skip-rate" placeholder="Rate (persen)">
        <div class="result" id="skip-result">
          <p>Total EXP yang didapat: <strong class="mono" id="skip-xp">-</strong></p>
          <p>Level setelah skip: <strong id="skip-level">-</strong></p>
          <p>Jumlah bos di rentang ini: <strong class="mono" id="skip-bosses">-</strong></p>
          <p>Total Spina dibutuhkan: <strong class="mono" id="skip-spina">-</strong></p>
          <p>Estimasi biaya (Rupiah): <strong class="mono" id="skip-idr">-</strong></p>
        </div>
      </div>
    </div>
  `;

  const $ = (id) => root.querySelector(`#${id}`);
  $("to-chapter").value = String(chapters[chapters.length - 1].chapter);

  // Tabs
  root.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      root.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      root.querySelector(`#panel-${btn.dataset.tab}`).classList.add("active");
    });
  });

  function evaluate() {
    const lv = parseInt($("level").value, 10) || 1;
    const lvP = parseInt($("level-percentage").value, 10) || 0;
    let from = parseInt($("from-chapter").value, 10);
    let to = parseInt($("to-chapter").value, 10);
    if (from > to) [from, to] = [to, from];

    const totalXp = sumXp(from, to);
    const [newLv, newLvP] = addXP(lv, lvP, totalXp);

    // MQ Calculator tab
    $("mq-xp").textContent = formatNumber(totalXp);
    $("mq-level").textContent = `${newLv} (${newLvP}%)`;

    // Skip MQ tab
    const bossCount = countBosses(from, to);
    const spina = bossesSkippedCost(bossCount);
    const rate = parseFloat($("skip-rate").value) || 0;
    const idr = spinaToIDR(rate, spina);

    $("skip-xp").textContent = formatNumber(totalXp);
    $("skip-level").textContent = `${newLv} (${newLvP}%)`;
    $("skip-bosses").textContent = `${bossCount} bos`;
    $("skip-spina").textContent = `${formatNumber(spina)} Spina`;
    $("skip-idr").textContent = rate > 0 ? `Rp${formatNumber(idr)}` : "isi ratenya dulu";
  }

  root.querySelectorAll("input, select").forEach((el) => el.addEventListener("input", evaluate));
  evaluate();
}
