document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleStatus");
  const blockedCountEl = document.getElementById("blockedCount");

  chrome.storage.local.get({ enabled: true, blockedCount: 0 }, (data) => {
    toggle.checked = data.enabled;
    blockedCountEl.textContent = data.blockedCount;
  });

  toggle.addEventListener("change", () => {
    chrome.storage.local.set({ enabled: toggle.checked });
  });

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "local" && changes.blockedCount) {
      blockedCountEl.textContent = changes.blockedCount.newValue;
    }
  });
});
