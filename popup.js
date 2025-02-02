document.addEventListener('DOMContentLoaded', () => {
  const chatBody = document.getElementById('chat-body');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const closeBtn = document.getElementById('close-btn');

  // Close the popup
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

  // Fetch answer from dummy.json
  async function getAnswer(question) {
    const response = await fetch(chrome.runtime.getURL('dummy.json'));
    const data = await response.json();
    return data[question] || "Sorry, I don't have an answer for that.";
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
    const response = await fetch(chrome.runtime.getURL('dummy.json'));
    const data = await response.json();
    hideTypingIndicator();
    return data[question] || "Sorry, I don't have an answer for that.";
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