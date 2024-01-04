```javascript
const express = require('express');
const router = express.Router();
const UserProfile = require('./user_profiles');
const TravelData = require('./travel_data');

// Route to get itinerary for a user
router.get('/:username', (req, res) => {
    const username = req.params.username;

    UserProfile.findOne({ username: username }, (err, user) => {
        if (err) {
            console.error('Error in fetching user profile', err);
            res.status(500).send('Error in fetching user profile');
        } else {
            const travelPreferences = user.travelPreferences;

            // Fetch travel data for all preferred destinations
            TravelData.find({ destination: { $in: travelPreferences } }, (err, travelData) => {
                if (err) {
                    console.error('Error in fetching travel data', err);
                    res.status(500).send('Error in fetching travel data');
                } else {
                    // Create itinerary based on travel data
                    const itinerary = travelData.map(data => {
                        return {
                            destination: data.destination,
                            attractions: data.attractions,
                            diningSpots: data.diningSpots,
                            hiddenGems: data.hiddenGems
                        };
                    });

                    res.status(200).json(itinerary);
                }
            });
        }
    });
});

// Route to update itinerary for a user
router.post('/:username', (req, res) => {
    const username = req.params.username;
    const newPreferences = req.body.travelPreferences;

    UserProfile.updateTravelPreferences(username, newPreferences, (err, user) => {
        if (err) {
            console.error('Error in updating travel preferences', err);
            res.status(500).send('Error in updating travel preferences');
        } else {
            res.status(200).send('Travel preferences updated successfully');
        }
    });
});

module.exports = router;
```

