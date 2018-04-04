chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
  	alert(tab.url);
  	chrome.tabs.executeScript(null, {file : "contentScript.js"});
  	chrome.tabs.executeScript(null, {file : "javascript/contentScript.js"});
  	alert(tab.url);
  }
})