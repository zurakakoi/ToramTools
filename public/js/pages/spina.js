import { idrToSpina } from "../utils/spinaMath.js";
import { formatNumber, bindIDRInput, parseIDRInput } from "../utils/format.js";

export function renderSpina(root) {
  root.innerHTML = `
    <div class="page-kanji">金</div>
    <h1>Kalkulator Spina</h1>
    <p class="lede">Konversi rate dan nilai IDR menjadi estimasi Spina.</p>

    <div class="card">
      <label for="rate">Rate (Contoh: 136)</label>
      <input type="number" id="rate" placeholder="Rate (persen)">
      <label for="idr">Nilai IDR (Contoh: 30.000)</label>
      <input type="text" id="idr" placeholder="Masukkan nilai IDR">
      <button class="btn" id="btnHitung">Hitung</button>
      <div class="result hidden" id="hasil"></div>
    </div>
  `;

  const $ = (id) => root.querySelector(`#${id}`);
  bindIDRInput($("idr"));

  $("btnHitung").addEventListener("click", () => {
    const rate = parseFloat($("rate").value);
    const idr = parseIDRInput($("idr").value);
    const box = $("hasil");

    if (!rate || !idr || rate <= 0 || idr <= 0) {
      box.innerHTML = "Masukkan angka yang valid!";
      box.classList.remove("hidden");
      return;
    }

    const spina = idrToSpina(rate, idr);
    box.innerHTML = `<strong>${formatNumber(spina)} Spina</strong>`;
    box.classList.remove("hidden");
  });
}
