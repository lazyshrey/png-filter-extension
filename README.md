<div align="center">
  <br />
  <img src="icons/icon128.png" alt="PNG-Filter Logo" width="128" />
  <br />
  <h1>🔍 PNG-FILTER</h1>
  <p><strong>Verifying Authenticity in Real-Time</strong></p>
  <p><i>A Premium, High-Performance Chrome Extension to Detect and Flag Fake PNGs Instantly in the Google Search Grid.</i></p>

  <br />

  <div align="center">
    <a href="https://developer.chrome.com/docs/extensions/mv3/"><img src="https://img.shields.io/badge/Manifest-V3-111111?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Manifest V3" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" /></a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-CSS3-orange?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5/CSS3" /></a>
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" /></a>
    <a href="https://discord.com/invite/ZVCB8EnRX2"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a>
  </div>

  <br />
  <div align="center">
    <img src="assets/preview.png" alt="PNG-Filter Preview" width="550" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);" />
  </div>
  <br />
</div>

---

## 📽️ The PNG-Filter Vision

**PNG-Filter** solves a frustrating, daily digital workflow bottleneck for designers, developers, and creators. We've all searched for a transparent PNG asset, only to download a file with a fake, baked-in gray and white checkerboard background. This extension integrates seamlessly into Google Image Search to verify transparency under the hood and overlay visual verification labels before you ever click or download a result.

<div align="center">
  <table border="0" cellspacing="0" cellpadding="20">
    <tr>
      <td width="300" valign="top" style="border: 1px solid #333; border-radius: 15px; background: rgba(255,255,255,0.02); padding: 15px;">
        <h3>⚡ Instant Scan</h3>
        <p>Automatically scans the Google Images results grid in one go as the page loads and content appears.</p>
      </td>
      <td width="300" valign="top" style="border: 1px solid #333; border-radius: 15px; background: rgba(255,255,255,0.02); padding: 15px;">
        <h3>🏷️ Smart Badges</h3>
        <p>Dynamic indicator pills (<code>Real PNG</code> / <code>Fake PNG</code>) float directly on thumbnails with blur effects.</p>
      </td>
    </tr>
    <tr>
      <td width="300" valign="top" style="border: 1px solid #333; border-radius: 15px; background: rgba(255,255,255,0.02); padding: 15px;">
        <h3>⏳ Concurrency Queue</h3>
        <p>Restricts background operations to 4 parallel image scans to preserve system RAM and prevent network spikes.</p>
      </td>
      <td width="300" valign="top" style="border: 1px solid #333; border-radius: 15px; background: rgba(255,255,255,0.02); padding: 15px;">
        <h3>💾 Memory Caching</h3>
        <p>An in-memory LRU cache stores up to 50 validated URLs so you never fetch the same image twice.</p>
      </td>
    </tr>
  </table>
</div>

---

## 🚀 Local Installation

To load and test this extension on your machine:

1. Clone or download this repository.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. In the top-right corner, toggle the **Developer mode** switch to **ON**.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the folder containing these files (`C:\Codes\projects\png-filter`).
6. Open [Google Images](https://images.google.com) and search for a transparent image (e.g. `cat transparent png`) to see it in action!

---

## 🔒 Privacy & Safety

- **Local Execution:** All calculations run locally in your browser context using `OffscreenCanvas`.
- **Zero Tracking:** No search queries, browsing history, or identifiers are logged or sent to any server.
- **No External Dependencies:** Standard vanilla APIs ensure there is no hidden tracking code.

---

## 📄 License

This project is licensed under the MIT License.
