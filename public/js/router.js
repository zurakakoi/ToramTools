const routes = new Map();
const appEl = () => document.getElementById("app");

export function registerRoute(path, renderFn) {
  routes.set(path, renderFn);
}

export function startRouter() {
  window.addEventListener("hashchange", render);
  render();
}

function currentPath() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash === "" ? "/" : hash;
}

function render() {
  const path = currentPath();
  const renderFn = routes.get(path) || routes.get("/");
  appEl().innerHTML = "";
  renderFn(appEl());

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === path);
  });

  // Close mobile menu on navigation
  document.getElementById("navMenu").classList.remove("active");
  document.getElementById("hamburger").classList.remove("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}
