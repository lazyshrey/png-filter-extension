// Cache validation results (URL -> transparency status)
const resultCache = new Map();
const MAX_CACHE_SIZE = 500;

function addToCache(url, isTransparent) {
  if (resultCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = resultCache.keys().next().value;
    resultCache.delete(oldestKey);
  }
  resultCache.set(url, isTransparent);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "checkTransparency") {
    const { url } = message;

    if (!url) {
      sendResponse({ status: "error", message: "No URL provided" });
      return true;
    }

    if (resultCache.has(url)) {
      sendResponse({ status: "success", isTransparent: resultCache.get(url) });
      return true;
    }

    analyzeImageTransparency(url)
      .then((isTransparent) => {
        addToCache(url, isTransparent);
        sendResponse({ status: "success", isTransparent });
      })
      .catch((error) => {
        console.error("Analysis failed for:", url, error);
        sendResponse({ status: "error", message: error.message });
      });

    // Keep channel open for async response
    return true;
  }
});

async function analyzeImageTransparency(url) {
  try {
    // Fetch image data
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();

    // Load into ImageBitmap
    const imageBitmap = await createImageBitmap(blob);

    // Downscale large images to optimize memory usage (max 200x200)
    let targetWidth = imageBitmap.width;
    let targetHeight = imageBitmap.height;
    const MAX_DIMENSION = 200;

    if (targetWidth > MAX_DIMENSION || targetHeight > MAX_DIMENSION) {
      if (targetWidth > targetHeight) {
        targetHeight = Math.round((targetHeight * MAX_DIMENSION) / targetWidth);
        targetWidth = MAX_DIMENSION;
      } else {
        targetWidth = Math.round((targetWidth * MAX_DIMENSION) / targetHeight);
        targetHeight = MAX_DIMENSION;
      }
    }

    const canvas = new OffscreenCanvas(targetWidth, targetHeight);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageBitmap, 0, 0, targetWidth, targetHeight);
    imageBitmap.close();

    const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
    const data = imgData.data;
    let isTransparent = false;

    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 255) {
        isTransparent = true;
        break;
      }
    }

    return isTransparent;
  } catch (err) {
    throw err;
  }
}
