```javascript
const express = require('express');
const router = express.Router();
const UserProfile = require('./user_profiles');

// Route to get all travel logs for a user
router.get('/:username', (req, res) => {
    UserProfile.findOne({ username: req.params.username }, (err, user) => {
        if (err) {
            console.error('Error in fetching user profile', err);
            res.status(500).send('Error in fetching user profile');
        } else if (!user) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(user.travelLogs);
        }
    });
});

// Route to add a new travel log for a user
router.post('/:username', (req, res) => {
    const newLog = {
        destination: req.body.destination,
        date: req.body.date,
        experiences: req.body.experiences,
        photos: req.body.photos
    };

    UserProfile.addTravelLog(req.params.username, newLog, (err, user) => {
        if (err) {
            console.error('Error in adding travel log', err);
            res.status(500).send('Error in adding travel log');
        } else {
            res.status(200).json(user.travelLogs);
        }
    });
});

module.exports = router;
```

