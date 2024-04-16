const express = require('express');
const dbConnection = require('./config/config'); 
const app = express();
require('dotenv').config();  // To use environment variables
const PORT = process.env.PORT || 3000;
const routes = require('./routes/artworkRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', routes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Express listening on port http://localhost:${PORT}`);
});

