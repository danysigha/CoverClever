chrome.tabs.query({
        active: true, 
        lastFocusedWindow: true, 
        url: "https://member.bluecrossma.com/home/*"
    },

    (tabs) => {
        console.log("Tabs:", tabs);
        if (tabs.length > 0){
            console.log("You are logged into BCBS!");
        }
    //let url = tabs[0].url; use this to get the url
    }
);