document.getElementById("ask").addEventListener("click", async () => {
    const question = document.getElementById("question").value;
    const responseElement = document.getElementById("response");
  
    if (!question.trim()) {
      responseElement.innerText = "Please enter a question.";
      return;
    }
  
    // Fetch the dummy JSON file
    const jsonData = await fetch(chrome.runtime.getURL("dummy.json"))
      .then((res) => res.json())
      .catch((err) => {
        console.error("Error fetching JSON:", err);
        responseElement.innerText = "Error loading JSON file.";
      });
  
    if (!jsonData) return; // Stop if JSON failed to load
  
    // Call the Hugging Face API with the question and the JSON context
    const response = await callLLM(question, jsonData);
  
    // Show the response in the UI
    responseElement.innerText = response || "No response from the server.";
  });
  
  // Function to call the Hugging Face Inference API
  async function callLLM(question, jsonData) {
    const apiKey = "abc"; // Replace with your Hugging Face API key
    const endpoint = "https://api-inference.huggingface.co/models/bigscience/bloomz-560m";
  
    try {
      // Prepare the input prompt for the model
      const prompt = `
        Context: ${JSON.stringify(jsonData)}
        Question: ${question}
        Answer concisely.
      `;
  
      // Make the API request
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      });
  
      const data = await response.json();
  
      if (data.error) {
        console.error("Hugging Face API Error:", data.error);
        if (data.error.includes("loading")) {
          return "The model is currently loading. Please try again in a few minutes.";
        }
        return "Error: Unable to process the request.";
      }
  
      if (!Array.isArray(data) || !data[0]?.generated_text) {
        return "The model did not return a valid response.";
      }
  
      return data[0].generated_text.trim();
    } catch (error) {
      console.error("Error calling Hugging Face API:", error);
      return "Failed to connect to the Hugging Face API.";
    }
  }
  