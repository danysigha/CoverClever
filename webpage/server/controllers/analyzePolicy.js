async function getInsuranceScore(systemPrompt, userPrompt) {
    const apiKey = 'YOUR_OPENAI_API_KEY';
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4', // or another ChatCompletion-capable model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2, // or your preferred setting. keep it low though. we want consistent scoring.
        max_tokens: 50
      })
    });
  
    const data = await response.json();
    
    // The model's reply is in data.choices[0].message.content
    try {
      const modelReply = data.choices[0].message.content.trim();
      // Parse the JSON output
      const parsedResult = JSON.parse(modelReply);
      return parsedResult;
    } catch (err) {
      console.error('Failed to parse JSON from the LLM response:', err);
      return null;
    }
  }
  
           // [user prompt text from above]
  
//   getInsuranceScore(systemPrompt, userPrompt).then((result) => {
//     if (result) {
//       console.log("LLM Score:", result.score);
//     } else {
//       console.log("LLM did not return a valid JSON object.");
//     }
//   });

  module.exports = {
    getInsuranceScore: async (systemPrompt, userPrompt) => {
      const result = await getInsuranceScore(systemPrompt, userPrompt);
      return result;
    }
  };