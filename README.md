# Transparent PNG Checker - Chrome Extension

A lightweight, high-performance Manifest V3 Google Chrome extension that automatically scans Google Image search results in real-time, verifying if images claiming to be PNGs have actual transparent backgrounds or if they are "fake PNGs" with solid backgrounds (such as baked-in gray and white checkerboard patterns).

It places a premium, floating badge directly on the thumbnails in the search results grid:
*   **Real PNG** (Green Badge): Real alpha transparency (transparent pixels exist).
*   **Fake PNG** (Red Badge): Solid background (ends in `.png` but has no transparent pixels).

---

## 🛠️ Local Development Setup

To load and test this extension on your machine:

1.  **Download / Clone** this repository to a folder on your computer.
2.  Open Google Chrome and navigate to: `chrome://extensions`
3.  In the top-right corner of the Extensions page, toggle the **"Developer mode"** switch to **ON**.
4.  Click the **"Load unpacked"** button in the top-left corner.
5.  Select the folder containing this project (the directory containing `manifest.json`).
6.  The extension is now loaded! Go to [Google Images](https://images.google.com) and search for `transparent png` to see it in action.

*Note: There is no build step or package installation required. The extension uses pure, native web technologies (HTML, CSS, JS).*

---

## 🏗️ Architecture & Optimization Details

The extension is designed to run with a minimal RAM footprint and high speed:

*   **`manifest.json`:** Declares the Manifest V3 settings.
*   **`content.js`:** Monitors the Google Image Search grid, extracts original high-res image source URLs, and orchestrates validation.
    *   *Optimization:* Uses a **concurrency-controlled queue** (limit of 4 simultaneous checks) to prevent network congestion or CPU spikes.
    *   *Optimization:* Limits scanning to items matching the `.png` extension format to avoid scanning JPGs or WebPs.
*   **`background.js` (Service Worker):** Bypasses CORS using host permissions to fetch images, downscales large images using `OffscreenCanvas` to save RAM, scans the alpha channel, and caches results.
    *   *Optimization:* Downscales images to a maximum of 200x200 pixels prior to scanning to reduce pixel processing and memory overhead by up to 95%.
    *   *Optimization:* Implements an LRU cache (up to 500 entries) to prevent duplicate network requests.
*   **`content.css`:** Styles the green/red floating indicator badges.

---

## 🚀 Chrome Web Store Submission & Approval Guide

Google reviews extensions closely, particularly those utilizing host permissions. Follow these steps to ensure a smooth, rapid approval process.

### Step 1: Zip the Extension Files
Compress the following files and folders into a `.zip` archive (do not include git files or helper scripts):
*   `manifest.json`
*   `background.js`
*   `content.js`
*   `content.css`
*   `icons/`

### Step 2: Prepare Store Listing Assets
*   **Store Icon:** You can use the generated `icons/icon128.png` (128x128).
*   **Screenshots:** Create at least 1 screenshot showing the Google Images grid with the Green/Red badges. Dimensions must be `1280x800` or `640x400`.
*   **Promotional Tiles (Optional):** Small tile (440x280), Large tile (920x680), Marquee (1400x560).

### Step 3: Fill Out the Developer Console Fields

#### 1. Title & Metadata
*   **Name:** Transparent PNG Checker
*   **Summary (Max 150 chars):** Instantly check if PNG images in Google Search are actually transparent or just fake checkerboards, directly in the search grid.
*   **Detailed Description (Copy & Paste):**
    ```text
    Tired of downloading "transparent" PNG images from search results only to discover they have a fake, baked-in gray and white checkerboard background? 

    Transparent PNG Checker solves this daily developer and designer headache! It automatically scans images in the Google Image search grid and verifies if they have true alpha-transparency before you click or download.

    Features:
    - Real-time Grid Scanning: Checks PNG files as you scroll search results.
    - Floating Indicators: Shows a green "Real PNG" badge for true transparent backgrounds and a red "Fake PNG" badge for solid ones.
    - Zero Lag / Low RAM: Processes images in a background service worker using Offscreen Canvas optimization to keep your browser fast.
    - Minimalist Design: Non-intrusive badges that fit right into Google's native interface.

    Save time and avoid downloading fake assets. Perfect for web developers, UI/UX designers, and content creators.
    ```

#### 2. Single-Purpose Description (CRITICAL for Chrome Approval)
Google requires extensions to have a single, narrow purpose.
*   **Single-Purpose Statement:** "The sole purpose of this extension is to analyze PNG images in Google Image Search results and visually label their transparency status."

#### 3. Permission Justifications (CRITICAL for Chrome Approval)
Since the extension requests `<all_urls>` host permissions, you must justify it in the console:
*   **Permission:** `<all_urls>`
*   **Justification:** "The extension requires host permission to fetch the original PNG image source files from various web domains. The background worker fetches the image blob to inspect its alpha channel pixels on an Offscreen Canvas, verifying whether the image has true transparency or a fake solid background. Since Google Images links to files hosted across the entire web, the extension needs to be able to fetch from any external URL."

---

## 🔒 Privacy & Safety
*   This extension is completely privacy-focused. It runs entirely locally in your browser.
*   No personal data, search queries, or browsing history is tracked, collected, or transmitted.
