chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  console.log("Started");
    if (changeInfo.status === 'complete') {
        chrome.tabs.executeScript(tabId, {
            allFrames: true,
            file: 'src/inject/payload.js'
        });
    }
});
