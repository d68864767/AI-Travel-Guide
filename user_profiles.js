```javascript
const mongoose = require('mongoose');

// Define the schema for User Profiles
const UserProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { // For simplicity, storing password as plain text. In a real-world application, always hash + salt it!
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    travelPreferences: {
        type: Array,
        default: []
    },
    travelLogs: {
        type: Array,
        default: []
    }
});

// Compile the schema into a model
const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

// Function to create a new user profile
const createProfile = (username, password, email, callback) => {
    const newUserProfile = new UserProfile({
        username: username,
        password: password,
        email: email
    });

    newUserProfile.save((err, doc) => {
        if (err) {
            console.error('Error in creating user profile', err);
            callback(err, null);
        } else {
            console.log('User profile created successfully');
            callback(null, doc);
        }
    });
};

// Function to update travel preferences
const updateTravelPreferences = (username, newPreferences, callback) => {
    UserProfile.findOneAndUpdate(
        { username: username },
        { $set: { travelPreferences: newPreferences } },
        { new: true },
        (err, doc) => {
            if (err) {
                console.error('Error in updating travel preferences', err);
                callback(err, null);
            } else {
                console.log('Travel preferences updated successfully');
                callback(null, doc);
            }
        }
    );
};

// Function to add a new travel log
const addTravelLog = (username, newLog, callback) => {
    UserProfile.findOneAndUpdate(
        { username: username },
        { $push: { travelLogs: newLog } },
        { new: true },
        (err, doc) => {
            if (err) {
                console.error('Error in adding travel log', err);
                callback(err, null);
            } else {
                console.log('Travel log added successfully');
                callback(null, doc);
            }
        }
    );
};

module.exports = { createProfile, updateTravelPreferences, addTravelLog };
```
