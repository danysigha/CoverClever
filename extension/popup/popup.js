// document.getElementById("processButton").addEventListener("click", () => {
//   const fileInput = document.getElementById("fileInput");
//   const file = fileInput.files[0];

//   if (!file) {
//     document.getElementById("status").textContent = "Please select a file.";
//     return;
//   }

//   const reader = new FileReader();
//   reader.onload = (event) => {
//     const fileContent = event.target.result;

//     chrome.runtime.sendMessage(
//       { type: "processFile", content: fileContent },
//       (response) => {
//         document.getElementById("status").textContent = response.message;
//       }
//     );
//   };
//   reader.readAsText(file);
// });

document.getElementById("processButton").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    document.getElementById("status").textContent = "Please select a file.";
    return;
  }

  const reader = new FileReader();
  if (file.type === "text/plain") {
    // Process plain text files
    reader.onload = (event) => {
      const fileContent = event.target.result;
      console.log("Extracted text:", fileContent);
      document.getElementById("status").textContent = "Text file processed!";
    };
    reader.readAsText(file);
  } else if (file.type === "application/pdf") {
    // Process PDF files
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/libs/pdf.worker.min.mjs";
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      console.log("# of pages:", pdf.numPages);
      console.log("Extracted text:", fullText);
      document.getElementById("status").textContent =
        "PDF processed successfully!";
    };
    reader.readAsArrayBuffer(file);
  } else if (
    file.type ==
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    // Process DOCX files
    reader.onload = async (event) => {
      const arrayBuffer = event.target.result;
      mammoth
        .extractRawText({ arrayBuffer: arrayBuffer })
        .then((result) => {
          console.log("Extracted text:", result.value);
          document.getElementById("status").textContent =
            "DOCX processed successfully!";
          if (result.messages.length > 0) {
            console.warn("Mammoth warnings:", result.messages);
          }
        })
        .catch((error) => {
          console.error("Error extracting text from DOCX:", error);
          alert("An error occurred while processing the file.");
        });
    };
    reader.readAsArrayBuffer(file);
  } else {
    document.getElementById("status").textContent = "Unsupported file type.";
  }
});

// document.getElementById("openModal").addEventListener("click", () => {
//   chrome.windows.create({
//     url: "/options/options.html",
//     type: "popup",
//     width: 400,
//     height: 300,
//   });
// });