document.addEventListener('DOMContentLoaded', () => {
  const chatBody = document.getElementById('chat-body');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const closeBtn = document.getElementById('close-btn');

  closeBtn.addEventListener('click', () => {
    window.close();
  });

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

  function addMessage(text, sender) {
    const message = document.createElement('div');
    message.classList.add('chat-message', sender);
    message.innerHTML = `<div class="message-text">${text}</div>`;
    
    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    message.appendChild(timestamp);
    
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

  async function getAnswer(question) {
    showTypingIndicator();
  
    const response = await fetch(chrome.runtime.getURL('dummy.json'));
    const data = await response.json();
    const context = formatContext(data);

    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const apiKey = ""; // Replace with your actual OpenAI API key

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an insurance policy assistant. Provide detailed and accurate answers based on the given context. Always include all relevant details, such as in-network and out-of-network costs, benefit limits, and any other important information." },
        { role: "user", content: `Context: ${context}\n\nQuestion: ${question}` }
      ],
      temperature: 0.5,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      hideTypingIndicator();

      if (data.choices && data.choices[0] && data.choices[0].message.content) {
        return data.choices[0].message.content;
      } else {
        return "Sorry, I couldn't find an answer to that question.";
      }
    } catch (error) {
      hideTypingIndicator();
      console.error("Error fetching answer:", error);
      return "Sorry, something went wrong. Please try again.";
    }
  }

  function formatContext(data) {
    let context = "";
    for (const category in data) {
      context += `**${category}**\n`;
      for (const subCategory in data[category].content) {
        context += `- ${subCategory}:\n`;
        const details = data[category].content[subCategory];
        for (const key in details) {
          context += `  - ${key}: ${details[key]}\n`;
        }
      }
    }
    return context;
  }

  const minimizeBtn = document.getElementById('minimize-btn');
  minimizeBtn.addEventListener('click', () => {
    document.querySelector('.chat-body').classList.toggle('hidden');
    document.querySelector('.chat-input').classList.toggle('hidden');
    minimizeBtn.textContent = document.querySelector('.chat-body').classList.contains('hidden') ? '+' : '−';
  });
});
