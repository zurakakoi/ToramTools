const SHOW_SECONDS = 5;

export function showPromoModal({
  title,
  message,
  ctaLabel,
  ctaUrl,
  badge = "Promo",
}) {
  // Avoid stacking duplicates if called twice quickly.
  document.getElementById("promoModal")?.remove();

  const wrap = document.createElement("div");
  wrap.id = "promoModal";
  wrap.className = "promo-overlay";
  wrap.innerHTML = `
    <div class="promo-card" role="dialog" aria-modal="true" aria-label="${title}">
      <button class="promo-close" id="promoClose" aria-label="Tutup">&times;</button>
      <span class="promo-badge">${badge}</span>
      <h3>${title}</h3>
      <p>${message}</p>
      <a class="promo-cta" href="${ctaUrl}" target="_blank" rel="noopener">${ctaLabel}</a>
      <div class="promo-timer">
        <div class="promo-timer-bar" id="promoTimerBar"></div>
      </div>
    </div>
  `;
  document.body.appendChild(wrap);

  // Trigger enter animation on next frame.
  requestAnimationFrame(() => wrap.classList.add("visible"));

  const bar = wrap.querySelector("#promoTimerBar");
  requestAnimationFrame(() => {
    bar.style.transitionDuration = `${SHOW_SECONDS}s`;
    bar.style.transform = "scaleX(0)";
  });

  let closed = false;
  function close() {
    if (closed) return;
    closed = true;
    wrap.classList.remove("visible");
    setTimeout(() => wrap.remove(), 250);
  }

  const timer = setTimeout(close, SHOW_SECONDS * 1000);

  wrap.querySelector("#promoClose").addEventListener("click", () => {
    clearTimeout(timer);
    close();
  });
  wrap.addEventListener("click", (e) => {
    if (e.target === wrap) {
      clearTimeout(timer);
      close();
    }
  });
}
