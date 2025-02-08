let scrapedData = null; // Store scraped data in background memory

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "storeData") {
        scrapedData = message.data;  // Save data from content.js
        console.log("Data received and stored in background:", scrapedData);

        // Log debug information if it exists
        if (message.debug) {
            console.log("Debug information:", message.debug);
        }
        
        sendResponse({ status: "success", message: "Data stored in background" });
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
    
    else if (message.action === "download") {
        if (!scrapedData) {
            console.error("No data available to download.");
            sendResponse({ status: "error", message: "No data available" });
            return;
        }

        downloadScrapedData();

        sendResponse({ status: "success", message: "Download started" });
    }
    
    else {
        console.warn("Unknown action:", message.action);
        sendResponse({ status: "error", message: "Unknown action" });
    }
});

function downloadScrapedData() {
    // Create the blob with properly stringified data
    let blob = new Blob([JSON.stringify(scrapedData, null, 2)], { type: "application/json" });
    let reader = new FileReader();
    
    reader.onloadend = function() {
        chrome.downloads.download({
            url: reader.result,
            filename: "scraped_data.json",  // Changed to .json since we're saving JSON data
            saveAs: true
        });
    };
    
    reader.readAsDataURL(blob);
}