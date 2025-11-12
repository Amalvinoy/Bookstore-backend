// Database connection
require('dotenv').config();
const mongoose = require('mongoose');

dbstring = process.env.connectionString 

// connect to database with recommended options
     mongoose.connect(dbstring)
        .then(() => {
            console.log('Connected to database');
        })
        .catch((err) => {
            console.log('Error connecting to database:', err);
        });

