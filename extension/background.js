chrome.runtime.onInstalled.addListener(() => {
  console.log("CoverClever extension installed!");
  chrome.tabs.create({
    url: "http://localhost:5173/"
  });
});

// Listen for messages from the webpage
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request.type === "LOGIN_SUCCESS") {
      // Store user data in extension storage
      chrome.storage.local.set({ 
        userData: request.userData,
        isLoggedIn: true 
      });
      sendResponse({ status: "success" });
    }
    if (request.type === "QUESTIONNAIRE_COMPLETE") {
      // Update extension state
      chrome.storage.local.set({ 
        questionnaireComplete: true,
        preferences: request.preferences 
      });
      sendResponse({ status: "success" });
    }
    if (request.type === "CLOSE_TAB") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.remove(tabs[0].id);
        }
      });
      sendResponse({ status: "success" });
    }
  }
);