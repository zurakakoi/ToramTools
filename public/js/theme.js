const THEMES = ["japanese", "purple", "light"];
const STORAGE_KEY = "toram-theme";

export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  const theme = THEMES.includes(saved) ? saved : "japanese";
  applyTheme(theme);

  const picker = document.getElementById("themePicker");
  picker.value = theme;
  picker.addEventListener("change", () => applyTheme(picker.value));
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
}
