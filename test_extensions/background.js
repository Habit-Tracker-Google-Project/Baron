let startTime = Date.now();
chrome.tabs.onActivated.addListener(async function(activeInfo) {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  console.log(`Switching to: ${tab.url}`);
  console.log(tab);
  // Calculate elapsed time in seconds
  const elapsedTimeSeconds = (Date.now() - startTime) / 1000;
  console.log(`Elapsed time: ${elapsedTimeSeconds.toFixed(2)} seconds`);

  // Update start time
  startTime = Date.now();
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // you can ignore TabID here
  // console.log(changeInfo);
  // console.log(tab);
  if (changeInfo.status===`complete`) {
    console.log(tab);
    console.log(`Switching to: ${changeInfo.url}`);
    const elapsedTimeSeconds = (Date.now() - startTime) / 1000;
    console.log(`Elapsed time: ${elapsedTimeSeconds.toFixed(2)} seconds`);
    startTime = Date.now();
    // let youtube = document.getElementByID("youtube");
    // console.log("YO CHECK sTHIS OUT "+youtube);
  } 
  // Update this section so that it tracks when a user changes the URL
  // HINT: You're going to have to use if() statements
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
});
