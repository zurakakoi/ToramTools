import { showPromoModal } from "../components/promoModal.js";

export function renderHome(root) {
  root.innerHTML = `
    <div class="page-kanji">寮</div>
    <div class="term-badge"><span class="dot"></span> toram-tools v2 · online</div>
    <h1>Toram Tools</h1>
    <p class="lede">Kalkulator EXP, Main Quest, Spina, dan material untuk pemain Toram Online, stop hitung manual lagi:v</p>

    <div class="stat-grid">
      <a class="stat-card" href="#/xp">
        <div class="k">Exp Calc</div>
        <div class="t">Kalkulator Experience</div>
        <div class="d">Hitung run/quest yang dibutuhkan untuk capai level target.</div>
      </a>
      <a class="stat-card" href="#/mq">
        <div class="k">MQ / Skip</div>
        <div class="t">Main Quest &amp; Skip pakai Spina</div>
        <div class="d">Pilih rentang bab, lihat EXP, Level, Spina, dan biaya IDR-nya.</div>
      </a>
      <a class="stat-card" href="#/spina">
        <div class="k">Spina</div>
        <div class="t">Kalkulator Spina</div>
        <div class="d">Konversi rate ke Spina berdasarkan nilai Rp.</div>
      </a>
      <a class="stat-card" href="#/mats">
        <div class="k">Mats</div>
        <div class="t">Kalkulator Material</div>
        <div class="d">Hitung kebutuhan stak dan total biaya crafting.</div>
      </a>
    </div>
  `;

  showPromoModal({
  badge: "Fhmii Store",
  title: "Butuh Aplikasi Premium?",
  message: "Temukan berbagai aplikasi premium untuk kebutuhanmu di Fhmii Store. Pilihan lengkap, harga terjangkau, dan proses pemesanan yang mudah.",
  ctaLabel: "Kunjungi Fhmii Store",
  ctaUrl: "https://fhmiistore.my.id",
});
}