let startTime = Date.now();
let currentWebsite = new URL ("http://www.default.com");

chrome.tabs.onActivated.addListener(async function(activeInfo) {

  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url !== ""){
    console.log(`Switching to: ${tab.url}`);
    console.log(tab);
    // Calculate elapsed time in seconds
    const elapsedTimeSeconds = (Date.now() - startTime) / 1000;
    console.log(`Elapsed time: ${elapsedTimeSeconds.toFixed(2)} seconds`);

    // Update start time
    startTime = Date.now();

    // Storage ----------

    storeCountInSession(currentWebsite.hostname, elapsedTimeSeconds); // stores the info assigned as (hostname : time)
    storeInDisk(currentWebsite.hostname, elapsedTimeSeconds);
    currentWebsite = new URL (tab.url);
    console.log(currentWebsite);

    if (tab.url === "https://habit-tracker-google-project.github.io/HabitTracker/HabitTracker.html"){
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"]
      })
    } 

  }

});


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // you can ignore TabID here
  // console.log(changeInfo);
  // console.log(tab);

  if (changeInfo.status===`complete` && tab.url !== null && tab.url !== "" && tab.active) {
    console.log(tab);
    console.log(`Switching to: ${tab.url}`);
    const elapsedTimeSeconds = (Date.now() - startTime) / 1000;
    console.log(`Elapsed time: ${elapsedTimeSeconds.toFixed(2)} seconds`);
    startTime = Date.now();
    // let youtube = document.getElementByID("youtube");
    // console.log("YO CHECK sTHIS OUT "+youtube);

    // Storage ----------

    storeCountInSession(currentWebsite.hostname, elapsedTimeSeconds); // stores the info assigned as (hostname : time)
    storeInDisk(currentWebsite.hostname, elapsedTimeSeconds);
    currentWebsite = new URL (tab.url);
    console.log(currentWebsite);

    if (tab.url === "https://habit-tracker-google-project.github.io/HabitTracker/HabitTracker.html"){
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"]
      })
    } 
  }   
});

// ---------------------------------------------------------------------
// Storage Tester

// This is a "debugging" listener
// Everytime the chrome dictionary changes, it will print the change to the
// console.
// Helpful for testing out your code
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [blegh, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${blegh}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});  

function storeCountInSession(taburl, time) {
  chrome.storage.session.get([taburl]).then((result) => {
      // If the entry doesn't exist in our lookup, create one and set it's count to 1
      if (result[taburl] === undefined) {
          chrome.storage.session.set({ [taburl]: time});
      } else {
          let newCount = result[taburl] + time;
          chrome.storage.session.set({ [taburl]: newCount});
      }
  });
}

function storeInDisk(taburl, time) {
  chrome.storage.local.get([taburl]).then((result) => {
      // If the entry doesn't exist in our lookup, create one and set it's count to 1
      if (result[taburl] === undefined) {
          chrome.storage.local.set({ [taburl]: time});
      } else {
          let newCount = result[taburl] + time;
          chrome.storage.local.set({ [taburl]: newCount});
      }
  });
}

function resetStorage() {
  chrome.storage.local.clear().then((result) => {
      console.log(result);
  });
  chrome.storage.session.clear().then((result) => {
      console.log(result);
  });
}
