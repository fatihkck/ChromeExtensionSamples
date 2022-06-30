window.onload = () => {
  chrome.tabs.captureVisibleTab((dataUrl) => {
    chrome.downloads.download({
      filename : "download.jpg",
      url : dataUrl
    });
  });
}