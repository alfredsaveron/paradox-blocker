window.siteRules = window.siteRules || {};

window.siteRules.google = {
  match: () => location.hostname.includes("google.com"),

  selectors: [
    "div.g",
    "div.MjjYud",
    "div.isv-r",
    "div.eA0Zlc",
    "g-card"
  ],

  filter: (el, utils) => {
    const imgAlt = el.querySelector("img")?.alt || "";
    return utils.matchesBlacklist(`${imgAlt} ${el.textContent}`);
  },

  init: (utils) => {
    const cat = "cute cat pictures";
    const q = new URLSearchParams(location.search).get("q");

    if (q && utils.matchesBlacklist(decodeURIComponent(q))) {
      const params = new URLSearchParams(location.search);
      params.set("q", cat);
      location.replace(`${location.pathname}?${params.toString()}`);
    }

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const input = document.querySelector("textarea[name='q'], input[name='q']");
      if (input && utils.matchesBlacklist(input.value)) {
        input.value = cat;
      }
    }, true);
  }
};
