window.siteRules = window.siteRules || {};

window.siteRules.youtube = {
  match: () => location.hostname.includes("youtube.com"),

  selectors: [
    "ytd-rich-item-renderer",
    "ytd-video-renderer",
    "ytd-grid-video-renderer",
    "ytd-compact-video-renderer",
    "ytd-reel-item-renderer",
    "ytd-playlist-renderer",
    "ytd-channel-renderer",
    "ytd-universal-watch-card-renderer"
  ],

  filter: (el, utils) => {
    return utils.matchesBlacklist(el.textContent);
  },

  init: (utils) => {
    const cats = ["cute cat videos", "funny cats playing", "cat purring"];
    const randomCat = () => cats[Math.floor(Math.random() * cats.length)];

    function checkSearch() {
      const q = new URLSearchParams(location.search).get("search_query");
      if (q && utils.matchesBlacklist(decodeURIComponent(q))) {
        location.href = `/results?search_query=${encodeURIComponent(randomCat())}`;
      }
    }

    checkSearch();
    setInterval(checkSearch, 400);

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      const input = document.querySelector("input#search");
      if (input && utils.matchesBlacklist(input.value)) {
        input.value = randomCat();
      }
    }, true);
  }
};
