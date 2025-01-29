console.log("testing testing 12");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    if (tab.url && tab.url.includes("https://member.bluecrossma.com/home")) {
      console.log("You are logged into BCBS!");
    }
  }
});


//chrome.tabs.query({
//        active: true, 
//        lastFocusedWindow: true, 
//        url: "https://member.bluecrossma.com/home/*"
//    },
//
//    (tabs) => {
//        console.log("Tabs:", tabs);
//        if (tabs.length > 0){
//            console.log("You are logged into BCBS!");
//        }
//    //let url = tabs[0].url; use this to get the url
//    }
//);

