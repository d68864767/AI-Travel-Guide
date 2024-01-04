```javascript
const axios = require('axios');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Function to generate travel recommendations
async function generateTravelRecommendations(userInput) {
    const prompt = `Given that the user's interests are ${userInput.interests} and they are traveling to ${userInput.destination}, generate a list of recommended activities.`;
    return await generateResponse(prompt);
}

// Function to provide cultural insights
async function generateCulturalInsights(destination) {
    const prompt = `Provide cultural insights and tips for a traveler visiting ${destination}.`;
    return await generateResponse(prompt);
}

// Function to assist with language translation
async function translateText(text, targetLanguage) {
    const prompt = `Translate the following English text to ${targetLanguage}: ${text}`;
    return await generateResponse(prompt);
}

// Function to interact with OpenAI API
async function generateResponse(prompt) {
    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: 100,
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error(`Error in generating response: ${error}`);
    }
}

module.exports = {
    generateTravelRecommendations,
    generateCulturalInsights,
    translateText
};
```
