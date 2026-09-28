(() => {
  let isEnabled = true;

  const utils = {
    matchesBlacklist: (text) => {
      if (!text) return false;
      const lower = text.toLowerCase();
      return PARADOX_BLACKLIST.keywords.some((kw) => lower.includes(kw));
    },
    matchesSteamAppId: (url) => {
      if (!url) return false;
      return PARADOX_BLACKLIST.steamAppIds.some((id) => url.includes(id));
    }
  };

  chrome.storage.local.get({ enabled: true, blockedCount: 0 }, (data) => {
    isEnabled = data.enabled;
    if (isEnabled) init();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.enabled !== undefined) {
      isEnabled = changes.enabled.newValue;
      if (isEnabled) {
        scan();
      } else {
        document.querySelectorAll("[data-paradox-blocked]").forEach((el) => {
          el.removeAttribute("data-paradox-blocked");
          el.style.display = "";
        });
      }
    }
  });

  function addBlockCount(num = 1) {
    chrome.storage.local.get({ blockedCount: 0 }, (data) => {
      chrome.storage.local.set({ blockedCount: data.blockedCount + num });
    });
  }

  function getSiteRule() {
    const list = window.siteRules || {};
    for (const key of Object.keys(list)) {
      if (list[key].match()) return list[key];
    }
    return null;
  }

  function hide(el) {
    if (el.dataset.paradoxBlocked) return false;
    el.dataset.paradoxBlocked = "1";
    el.style.setProperty("display", "none", "important");
    return true;
  }

  function scanNode(node, rule) {
    if (!node || node.nodeType !== 1) return;

    let count = 0;
    for (const sel of rule.selectors) {
      if (node.matches && node.matches(sel)) {
        if (rule.filter(node, utils) && hide(node)) count++;
      }
      const children = node.querySelectorAll ? node.querySelectorAll(sel) : [];
      for (const child of children) {
        if (rule.filter(child, utils) && hide(child)) count++;
      }
    }

    if (count > 0) addBlockCount(count);
  }

  function scan() {
    const rule = getSiteRule();
    if (!rule) return;
    scanNode(document.body, rule);
  }

  function init() {
    const rule = getSiteRule();
    if (!rule) return;

    if (rule.init) {
      rule.init(utils);
    }

    scan();

    const observer = new MutationObserver((mutations) => {
      if (!isEnabled) return;
      for (const m of mutations) {
        for (const n of m.addedNodes) {
          scanNode(n, rule);
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
