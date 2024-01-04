```javascript
const mongoose = require('mongoose');

// Define the schema for Travel Data
const TravelDataSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    attractions: {
        type: Array,
        default: []
    },
    diningSpots: {
        type: Array,
        default: []
    },
    hiddenGems: {
        type: Array,
        default: []
    },
    culturalInsights: {
        type: Array,
        default: []
    }
});

// Compile the schema into a model
const TravelData = mongoose.model('TravelData', TravelDataSchema);

// Function to create a new travel data
const createTravelData = (destination, callback) => {
    const newTravelData = new TravelData({
        destination: destination
    });

    newTravelData.save((err, doc) => {
        if (err) {
            console.error('Error in creating travel data', err);
            callback(err, null);
        } else {
            console.log('Travel data created successfully');
            callback(null, doc);
        }
    });
};

// Function to update travel data
const updateTravelData = (destination, newData, callback) => {
    TravelData.findOneAndUpdate(
        { destination: destination },
        { $set: newData },
        { new: true },
        (err, doc) => {
            if (err) {
                console.error('Error in updating travel data', err);
                callback(err, null);
            } else {
                console.log('Travel data updated successfully');
                callback(null, doc);
            }
        }
    );
};

module.exports = { createTravelData, updateTravelData };
```
