```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import server configuration
const server = require('./server');

// Create the express app
const app = express();

// Apply middleware
app.use(cors());
app.use(bodyParser.json());

// Import screens
const HomeScreen = require('./home_screen');
const ItineraryPlannerScreen = require('./itinerary_planner_screen');
const TravelLogScreen = require('./travel_log_screen');

// Set up routes
app.use('/', HomeScreen);
app.use('/itinerary', ItineraryPlannerScreen);
app.use('/travel-log', TravelLogScreen);

// Import and set up database
const db = require('./database');
db.connect(err => {
    if (err) {
        console.error('Unable to connect to database');
        process.exit(1);
    }
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

