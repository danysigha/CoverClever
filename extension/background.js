chrome.runtime.onInstalled.addListener(() => {
  console.log("CoverClever extension installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "processFile") {
    const fileContent = message.content;
    console.log(fileContent);
    const wordCount = fileContent.split(/\s+/).length;

    sendResponse({ message: `File processed! Word count: ${wordCount}` });
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
      url: "background.html",
      type: "popup",
      width: 400,
      height: 500
  });
});