import { initTheme } from "./theme.js";
import { registerRoute, startRouter } from "./router.js";
import { renderHome } from "./pages/home.js";
import { renderXp } from "./pages/xp.js";
import { renderMats } from "./pages/mats.js";
import { renderSpina } from "./pages/spina.js";
import { renderMq } from "./pages/mq.js";
import { renderInfo } from "./pages/info.js";

initTheme();

registerRoute("/", renderHome);
registerRoute("/xp", renderXp);
registerRoute("/mq", renderMq);
registerRoute("/spina", renderSpina);
registerRoute("/mats", renderMats);
registerRoute("/info", renderInfo);

startRouter();

// Mobile hamburger menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");
  hamburger.classList.toggle("active", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
});

// Kanji watermark (Japanese theme only) changes per route to match the page.
const routeKanji = {
  "/": "冒",
  "/xp": "経",
  "/mq": "討",
  "/spina": "金",
  "/mats": "素",
  "/info": "情",
};

function updateKanjiBg() {
  const path = window.location.hash.replace(/^#/, "") || "/";
  const kanjiEl = document.getElementById("kanjiBg");
  kanjiEl.textContent = routeKanji[path] || "冒";
}

window.addEventListener("hashchange", updateKanjiBg);
updateKanjiBg();
