```javascript
const express = require('express');
const router = express.Router();
const { translateText } = require('./openai_api');

// Route to handle language translation
router.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
        return res.status(400).json({ error: 'Missing required fields: text and/or targetLanguage' });
    }

    try {
        const translatedText = await translateText(text, targetLanguage);
        return res.status(200).json({ translatedText });
    } catch (error) {
        console.error(`Error in translation: ${error}`);
        return res.status(500).json({ error: 'An error occurred while translating the text' });
    }
});

module.exports = router;
```
