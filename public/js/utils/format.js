export function formatNumber(n) {
  return new Intl.NumberFormat("id-ID").format(Math.round(n));
}

export function formatIDR(n) {
  return "Rp" + formatNumber(n);
}

// Strip thousand separators typed by the user (e.g. "30.000" / "30,000") back to a number.
export function parseIDRInput(value) {
  const cleaned = String(value).replace(/[.,\s]/g, "");
  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? 0 : n;
}

// Live-format a text input as the user types (adds thousand separators).
export function bindIDRInput(inputEl) {
  inputEl.addEventListener("input", () => {
    const raw = inputEl.value.replace(/\D/g, "");
    inputEl.value = raw ? new Intl.NumberFormat("id-ID").format(raw) : "";
  });
}
