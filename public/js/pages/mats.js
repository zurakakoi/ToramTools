import { formatNumber } from "../utils/format.js";

export function renderMats(root) {
  root.innerHTML = `
    <div class="page-kanji">素</div>
    <h1>Kalkulator Material</h1>
    <p class="lede">Hitung kebutuhan stak crafting dan estimasi total biayanya.</p>

    <div class="card">
      <h2>Hitung Jumlah Stak</h2>
      <div class="card-sub">Poin material yang kamu butuhkan</div>
      <label for="pointPerStack">Poin material per 1 stak</label>
      <input type="number" id="pointPerStack" placeholder="Contoh: 970">
      <label for="totalPointNeeded">Total poin yang dibutuhkan</label>
      <input type="number" id="totalPointNeeded" placeholder="Contoh: 200000">
      <button class="btn" id="btnStack">Hitung Jumlah</button>
      <div class="result hidden" id="stackResult"></div>
    </div>

    <div class="card">
      <h2>Kalkulasi Total Biaya</h2>
      <div class="card-sub">Total spina yang harus dikeluarkan</div>
      <label for="pricePerStack">Harga per 1 stak (spina)</label>
      <input type="number" id="pricePerStack" placeholder="Contoh: 70000">
      <label for="stacksToBuy">Jumlah yang perlu dibeli</label>
      <input type="number" id="stacksToBuy" placeholder="Contoh: 50">
      <button class="btn" id="btnSpina">Hitung Total Spina</button>
      <div class="result hidden" id="spinaResult"></div>
    </div>
  `;

  const $ = (id) => root.querySelector(`#${id}`);

  $("btnStack").addEventListener("click", () => {
    const pointPerStack = parseFloat($("pointPerStack").value);
    const totalPointNeeded = parseFloat($("totalPointNeeded").value);
    const box = $("stackResult");
    if (!pointPerStack || !totalPointNeeded || pointPerStack <= 0) {
      box.innerHTML = "Masukkan angka yang valid!";
      box.classList.remove("hidden");
      return;
    }
    const stacksNeeded = Math.ceil(totalPointNeeded / pointPerStack);
    box.innerHTML = `Kamu butuh <strong>${formatNumber(stacksNeeded)} stak</strong>.`;
    box.classList.remove("hidden");
  });

  $("btnSpina").addEventListener("click", () => {
    const pricePerStack = parseFloat($("pricePerStack").value);
    const stacksToBuy = parseFloat($("stacksToBuy").value);
    const box = $("spinaResult");
    if (!pricePerStack || !stacksToBuy || pricePerStack <= 0) {
      box.innerHTML = "Masukkan angka yang valid!";
      box.classList.remove("hidden");
      return;
    }
    const totalCost = pricePerStack * stacksToBuy;
    box.innerHTML = `Total biaya: <strong>${formatNumber(totalCost)} Spina</strong>.`;
    box.classList.remove("hidden");
  });
}
