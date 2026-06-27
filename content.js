const queue = [];
let activeChecks = 0;
const MAX_CONCURRENT_CHECKS = 4;

function extractUrlFromHref(href) {
  if (!href) return null;

  const imgurlMatch = href.match(/[?&]imgurl=([^&]+)/);
  if (imgurlMatch) {
    try {
      return decodeURIComponent(imgurlMatch[1]);
    } catch (e) {}
  }
  return null;
}

function findGridCell(anchor) {
  // Find grid cell container by walking up to find overflow:hidden
  let el = anchor;
  for (let i = 0; i < 5; i++) {
    el = el.parentElement;
    if (!el) break;
    const style = window.getComputedStyle(el);
    if (style.overflow === "hidden" && el.offsetWidth > 50 && el.offsetHeight > 50) {
      return el;
    }
  }
  return anchor.parentElement || anchor;
}

function injectBadge(container, isTransparent) {
  if (container.querySelector(".png-checker-badge")) return;

  container.style.position = "relative";
  container.style.overflow = "visible";

  const badge = document.createElement("div");
  badge.className = `png-checker-badge ${isTransparent ? "real-png" : "fake-png"}`;

  if (isTransparent) {
    badge.innerHTML = `
      <svg class="badge-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Real PNG</span>
    `;
  } else {
    badge.innerHTML = `
      <svg class="badge-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Fake PNG</span>
    `;
  }

  container.appendChild(badge);
}

function processQueue() {
  if (queue.length === 0 || activeChecks >= MAX_CONCURRENT_CHECKS) return;

  const { container, originalUrl } = queue.shift();
  activeChecks++;

  chrome.runtime.sendMessage(
    { action: "checkTransparency", url: originalUrl },
    (response) => {
      activeChecks--;

      if (response && response.status === "success") {
        injectBadge(container, response.isTransparent);
      }

      processQueue();
    }
  );

  processQueue();
}

function scanResults() {
  // Find image result links
  const links = document.querySelectorAll('a[href*="/imgres?"]');

  links.forEach((anchor) => {
    if (anchor.hasAttribute("data-png-checked")) return;

    const href = anchor.getAttribute("href");
    const originalUrl = extractUrlFromHref(href);

    if (!originalUrl) {
      anchor.setAttribute("data-png-checked", "no-url");
      return;
    }

    const isPng = /\.png(?:[?#].*)?$/i.test(originalUrl);
    if (!isPng) {
      anchor.setAttribute("data-png-checked", "non-png");
      return;
    }

    anchor.setAttribute("data-png-checked", "queued");

    const container = findGridCell(anchor);

    queue.push({ container, originalUrl });
  });

  processQueue();
}

// Run only on Google Image Search
const params = new URLSearchParams(window.location.search);
const isImageSearch =
  params.get("tbm") === "isch" ||
  params.get("udm") === "2";

if (isImageSearch) {
  scanResults();
  // Poll for lazy-loaded results
  setInterval(scanResults, 1500);
}
