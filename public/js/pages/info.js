export function renderInfo(root) {
  root.innerHTML = `
    <div class="page-kanji">情</div>
    <h1>Informasi Tentang Toram Tools</h1>
    <p class="lede">
      Toram Tools adalah kumpulan alat bantu berbasis web untuk mempermudah pemain Toram Online
      dalam melakukan berbagai perhitungan, terutama yang berkaitan dengan EXP, Main Quest,
      material crafting, dan estimasi harga Spina berdasarkan rate.
    </p>

    <div class="card">
      <h2>Tools yang Tersedia</h2>
      <ul style="padding-left: 20px; display: grid; gap: 8px; margin-top: 8px;">
        <li><strong>Exp Calc:</strong> Hitung run/quest yang dibutuhkan untuk mencapai level target.</li>
        <li><strong>MQ / Skip MQ:</strong> Hitung EXP &amp; Level dari rentang bab Main Quest, atau biaya untuk skip-nya pakai Spina.</li>
        <li><strong>Spina Calc:</strong> Konversi rate dan nilai IDR menjadi estimasi Spina.</li>
        <li><strong>Mats Calc:</strong> Hitung kebutuhan stak material dan total biaya crafting.</li>
      </ul>
    </div>

    <div class="card">
      <h2>Tujuan Website</h2>
      <p style="color: var(--text-muted);">
        Website ini dibuat untuk memberikan solusi cepat dan praktis tanpa perlu membuka aplikasi
        tambahan. Semua berjalan langsung di browser dan dapat diakses kapan saja.
      </p>
    </div>

   <div class="card">
  <h2>Terima Kasih</h2>
  <p style="color: var(--text-muted);">
    Proyek ini dikerjakan oleh <strong>Zura OFC (Fhmii)</strong>.
    Terima kasih kepada semua player toram online yang sudah membantu memberikan informasi mengenai game toram dan terimakasih juga kepada teman-teman saya yang selalu mendukung pengembangan website ini.<strong>Toram Online</strong>,
    serta situs <strong>toramtoools.github.io</strong> yang telah menyediakan
    daftar exp yang sangat membantu dalam pengembangan aplikasi ini.
    Semua hak cipta dan penghargaan tetap milik masing-masing pemilik game dan platform.
  </p>
</div>