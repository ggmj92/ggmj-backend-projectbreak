// Import libraries and modules 
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const dbConnection = require('./config/config');
const routes = require('./routes/artworkRoute');
const { upload } = require('./middleware/multerSetup');

// Configure environment variables
dotenv.config();

// Set up constants
const PORT = process.env.PORT || 3000;

// Initialize express app
const app = express();

// Set up middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({
    extended: true
  }));

// Set up static files
app.use(express.static('public'));

// Set up routes
app.use('/', routes);

// Connect to database
dbConnection();

// Start the server
app.listen(PORT, () => {
    console.log(`Express listening on port http://localhost:${PORT}`);
});
