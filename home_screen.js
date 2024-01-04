```javascript
const express = require('express');
const router = express.Router();

// Import travel recommendations and language translation modules
const TravelRecommendations = require('./travel_recommendations');
const LanguageTranslation = require('./language_translation');

// Home screen route
router.get('/', (req, res) => {
    res.send('Welcome to AI Travel Guide! Navigate to /itinerary to plan your trip or /travel-log to view your travel history.');
});

// Travel recommendations route
router.get('/recommendations', (req, res) => {
    // Get user preferences from request
    const userPreferences = req.body;

    // Generate travel recommendations
    TravelRecommendations.generate(userPreferences, (err, recommendations) => {
        if (err) {
            res.status(500).send('Error generating travel recommendations');
        } else {
            res.json(recommendations);
        }
    });
});

// Language translation route
router.get('/translate', (req, res) => {
    // Get text and target language from request
    const { text, targetLanguage } = req.body;

    // Translate text
    LanguageTranslation.translate(text, targetLanguage, (err, translatedText) => {
        if (err) {
            res.status(500).send('Error translating text');
        } else {
            res.json(translatedText);
        }
    });
});

module.exports = router;
```
