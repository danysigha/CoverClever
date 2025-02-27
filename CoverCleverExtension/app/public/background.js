console.log('Background script loaded!');

let scrapedData = null; // Store scraped data in background memory

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received in background:', message);
    
    if (message.action === "storeData") {
        scrapedData = message.data;  // Save data from content.js
        console.log("Data received and stored in background:", scrapedData);

        // Send the data back to the Score component
        chrome.runtime.sendMessage({
            action: "scrapingComplete",
            data: scrapedData,
            debug: message.debug
        });
        
        sendResponse({ status: "success", message: "Data stored and sent" });
        return true; // Keep the message channel open for the async response
    }

    else if (message.action === "start") {
        console.log("Start action received. URL: ", message.url);

        // Update the current tab with the new URL
        chrome.tabs.update({ url: message.url }, (tab) => {
            console.log('Tab updated:', tab);
            
            // Wait for the page to load before injecting content script
            chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                console.log('Tab updated event:', tabId, info);
                
                if (tabId === tab.id && info.status === 'complete') {
                    console.log('Page load complete, executing content script');
                    
                    // Remove the listener once we've found our tab
                    chrome.tabs.onUpdated.removeListener(listener);
                    
                    // Execute content script after page is loaded
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['content.js']
                    }, () => {
                        console.log('content.js executed after page load');
                        sendResponse({ status: "success", message: "Navigation started" });
                    });
                }
            });
        });
        
        return true; // Keep the message channel open for the async response
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
    
    return true; // Keep the message channel open for the async response
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


  // Example usage:
  const systemPrompt = `You are an expert evaluator of insurance policies. Your task is to assess how well a given insurance policy meets a user's specific needs—such as deductibles, coverage for certain diseases, age considerations, and location—by assigning a numerical score (for example, on a scale from 0 to 100, where a higher score indicates a better match). In addition, list the pros and cons of the policy relative to the user's requirements.

When you respond, output only a valid JSON object with exactly two keys:
"score": a number representing the compatibility of the policy with the user's needs.
"comments": an object containing two keys:
"pros": an array of strings listing positive aspects.
"cons": an array of strings listing negative aspects.

Do not include any extra keys, explanations, or markdown formatting. Your entire response must be valid JSON. Try and be consistent with the scoring. `; // [system prompt text from above]
  


const userPrompt = `{
  "PPO Student Health Plan": {
    "out-of-network": {
      "overall deductible": {
        "contributed": "$0.00",
        "remaining to meet": "$250.00",
        "limitations": "$250.00 per member per plan year",
        "exceptions & exclusions": ""
      },
      "out-of-pocket maximum": {
        "contributed": "$0.00",
        "remaining to meet": "$7,000.00",
        "limitations": "$7000.00 per member per plan year for medical benefits (accumulates with in-network amounts)",
        "exceptions & exclusions": "Calculation includes deductible, copayments and coinsurance for medical benefits only."
      }
    },
    "in-network": {
      "out-of-pocket maximum": {
        "contributed": "$0.00",
        "remaining to meet": "$1,000.00",
        "limitations": "$1000.00 per member per plan year for prescription drug benefits",
        "exceptions & exclusions": "Calculation includes deductible, copayments and coinsurance (accumulation for medical benefits and prescription drug benefits is separate)."
      }
    }
  },
  "Dental Blue Pediatric Essential Benefits": {
    "": {
      "overall deductible": {
        "contributed": "$0.00",
        "remaining to meet": "$50.00",
        "limitations": "$50.00 per eligible member per plan year",
        "exceptions & exclusions": "Deductible applies only for Group 2 and Group 3 services."
      },
      "out-of-pocket maximum": {
        "contributed": "$0.00",
        "remaining to meet": "$350.00",
        "limitations": "$350.00 per eligible member per plan year",
        "exceptions & exclusions": ""
      }
    }
  }
}`;

async function getInsuranceScore(systemPrompt, userPrompt) {
    try {
        // Get token from chrome storage
        const storage = await chrome.storage.local.get('token');
        const token = storage.token;
        console.log('Retrieved token from storage:', token); // Debug log

        if (!token) {
            console.error('Token not found in storage'); // Debug log
            throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:8000/api/analyze-policy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                systemPrompt,
                userPrompt
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get insurance score');
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error getting insurance score:', err);
        // Log the full storage state for debugging
        chrome.storage.local.get(null, (items) => {
            console.log('Current chrome.storage.local contents:', items);
        });
        throw err;
    }
}


getInsuranceScore(systemPrompt, userPrompt).then((result) => {
    if (result) {
      console.log("LLM Score:", result.score);
      chrome.storage.local.get('token', async (storage) => {
        const token = storage.token;
        if (!token) {
          console.error('No token found');
          return;
        }
        
        fetch('http://localhost:8000/insurance-policies', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              "policyId": "1",
              "deductibles": {},
              "benefits": {},
              "score": result.score,
              "comments": result.comments
          })
        });
      });
    } else {
      console.log("LLM did not return a valid JSON object.");
    }
});