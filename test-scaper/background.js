let scrapedData = null; // Store scraped data in background memory

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "storeData") {
        scrapedData = message.data;  // Save data from content.js
        console.log("Data received and stored in background:", scrapedData);

        // Store in localStorage for persistence
        if (scrapedData) {
            chrome.storage.local.set({ scrapedData }, () => {
                console.log("Data successfully saved in local storage.");
            });
        }

        if (message.debug) {
            console.log("Debug information:", message.debug);
        }
        
        sendResponse({ status: "success", message: "Data stored in background" });
    } 
    else if (message.action === "scrapeData") {
        console.log("Sending stored data to Score.tsx:", scrapedData);
        
        // Retrieve from local storage in case background memory was cleared
        chrome.storage.local.get("scrapedData", (result) => {
            sendResponse({ data: result.scrapedData || "No data available" });
        })
    }
    else if (message.action === "start") {
        // Handle the start action
        console.log("Start action received. URL: ", message.url);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0]; // The current active tab
            if (currentTab) {
                // Execute the content.js script in the current active tab
                chrome.scripting.executeScript({
                    target: { tabId: currentTab.id },
                    files: ['content.js']
                }, () => {
                    console.log('content.js executed after page load in the current tab');
                });
            }
        });
        
        // You can initiate some background process here if needed
        sendResponse({ status: "success", message: "Start action processed" });
    }
    else {
        console.warn("Unknown action:", message.action);
        sendResponse({ status: "error", message: "Unknown action" });
    }

    return true;
});