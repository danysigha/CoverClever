document.getElementById("processButton").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    document.getElementById("status").textContent = "Please select a file.";
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const fileContent = event.target.result;

    chrome.runtime.sendMessage(
      { type: "processFile", content: fileContent },
      (response) => {
        document.getElementById("status").textContent = response.message;
      }
    );
  };
  reader.readAsText(file);
});
