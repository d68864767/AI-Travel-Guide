```javascript
const mongoose = require('mongoose');

const connect = (callback) => {
    // Replace with your MongoDB connection string
    const dbUri = 'mongodb://localhost:27017/ai_travel_guide';

    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database connection successful');
            callback(null);
        })
        .catch((err) => {
            console.error('Database connection error', err);
            callback(err);
        });
};

module.exports = { connect };
```

