document.getElementById("start").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.runtime.sendMessage({ action: "start", url: tabs[0].url }, (response) => {
          console.log(response.status);
      });
  });
});

document.getElementById("download").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "download" }, (response) => {
      console.log(response.status);
  });
});
