document.addEventListener('DOMContentLoaded', () => {
  const chatBody = document.getElementById('chat-body');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const closeBtn = document.getElementById('close-btn');


  closeBtn.addEventListener('click', () => {
    window.close();
  });

  // Send message
  sendBtn.addEventListener('click', () => {
    const question = userInput.value.trim();
    if (question) {
      addMessage(question, 'user');
      userInput.value = '';
      getAnswer(question).then(answer => {
        addMessage(answer, 'bot');
      });
    }
  });

  // Add message to chat
  function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('chat-message', sender);
    message.textContent = text;
    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.classList.add('chat-message', 'bot');
    typingIndicator.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  // Update the getAnswer function
  async function getAnswer(question) {
    showTypingIndicator();
  
    // Fetch the context from dummy.json
    const response = await fetch(chrome.runtime.getURL('dummy.json'));
    const dummyData = await response.json();
    const context = dummyData.context;
  
    // Hugging Face API endpoint and model
    const apiUrl = "https://api-inference.huggingface.co/models/google/flan-t5-large";
    const apiKey = "My API key xyz"; // Replace with your API key
  
    // Prepare the payload with context
    const payload = {
      inputs: `Context: ${context}. Question: ${question}`,
    };
  
    try {
      // Make the API call
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      console.log("API Response:", data); // Log the API response
  
      hideTypingIndicator();
  
      // Handle model loading error
      if (data.error && data.error.includes("is currently loading")) {
        return "The model is still loading. Please try again in a few seconds.";
      }
  
      // Extract the answer from the API response
      if (data && data[0] && data[0].generated_text) {
        return data[0].generated_text;
      } else {
        // Fallback to dummy.json
        return dummyData.questions[question] || "Sorry, I couldn't find an answer to that question.";
      }
    } catch (error) {
      hideTypingIndicator();
      console.error("Error fetching answer:", error);
      // Fallback to dummy.json
      return dummyData.questions[question] || "Sorry, something went wrong. Please try again.";
    }
  }

  function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('chat-message', sender);
  
    if (sender === 'bot') {
      message.innerHTML = `
        <div class="message-text">${text}</div>
      `;
    } else {
      message.innerHTML = `
        <div class="message-text">${text}</div>
      `;
    }
  
    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    message.appendChild(timestamp);
  
    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // handle minimize button
  const minimizeBtn = document.getElementById('minimize-btn');

minimizeBtn.addEventListener('click', () => {
  document.querySelector('.chat-body').classList.toggle('hidden');
  document.querySelector('.chat-input').classList.toggle('hidden');
  minimizeBtn.textContent = document.querySelector('.chat-body').classList.contains('hidden') ? '+' : '−';
});
});