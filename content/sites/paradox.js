window.siteRules = window.siteRules || {};

window.siteRules.paradox = {
  match: () => {
    const host = location.hostname.toLowerCase();
    return host.includes("paradoxinteractive.com") ||
           host.includes("paradoxwikis.com") ||
           host.includes("paradoxplaza.com") ||
           host.includes("paradoxforum.com") ||
           host.includes("forum.paradoxplaza.com") ||
           host.includes("colossalorder.fi") ||
           host.includes("triumph.net");
  },

  selectors: [],
  filter: () => false,

  init: () => {
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
        <a href="https://www.google.com" class="back-btn">Go to Google</a>
      </div>
    `;
    window.stop();
  }
};
