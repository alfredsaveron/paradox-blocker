window.siteRules = window.siteRules || {};

window.siteRules.steam = {
  match: () => location.hostname.includes("steampowered.com") || location.hostname.includes("steamcommunity.com"),

  selectors: [
    "a.search_result_row",
    ".match_container",
    ".capsule_container",
    ".apphub_Card",
    ".store_capsule",
    "#search_suggestion_contents a",
    "#search_suggestion_contents .match",
    "#search_suggestion_contents > div",
    "#search_suggestion_contents > a",
    "a.match",
    ".match_creator",
    ".match_franchise",
    ".match_publisher",
    ".match_tag",
    ".forum_topic",
    ".game_area_dlc_row",
    ".game_area_purchase_game",
    "div[data-ds-appid]",
    "a[data-ds-appid]",
    "a[href*='/app/']",
    "a[href*='/bundle/']",
    "a[href*='/sub/']",
    "a[href*='/franchise/']",
    "a[href*='/publisher/']",
    "a[href*='/developer/']",
    "a[href*='/curator/']",
    "a[href*='/discussions/']",
    "a[href*='/stats/']",
    "a[href*='/workshop/']",
    "a[href*='/market/']"
  ],

  filter: (el, utils) => {
    const link = el.getAttribute("href") || el.dataset.dsAppid || "";
    if (utils.matchesSteamAppId(link)) return true;
    return utils.matchesBlacklist(`${link} ${el.textContent}`);
  },

  init: (utils) => {
    if (utils.matchesSteamAppId(location.href)) {
      document.documentElement.innerHTML = `
        <div style="background:#ffffff;color:#000000;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:center;padding:24px;box-sizing:border-box;">
          <style>
            .back-btn {
              background: #f5f5f5;
              color: #000000;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              font-size: 14px;
              transition: background 0.15s ease;
              display: inline-block;
            }
            .back-btn:hover {
              background: #e5e5e5;
            }
          </style>
          <h1 style="font-size:32px;font-weight:700;margin-bottom:8px;color:#000000;letter-spacing:-0.5px;">Whoops!</h1>
          <p style="color:#a9a9a9;font-size:15px;max-width:440px;line-height:1.5;margin-bottom:28px;">Nothing to see here. This Paradox page is currently blocked.</p>
          <a href="https://store.steampowered.com" class="back-btn">Back to Store</a>
        </div>
      `;
      window.stop();
    }
  }
};
