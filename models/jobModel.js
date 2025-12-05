const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
         type: String,
         required: true 
    },
    location: { type: String,
         required: true 
    },
    type: { 
        type: String,
         required: true 
    },
    salary: { 
        type: String,
         required: true 
    },
    qualification: {
         type: String,
         required: true 
    },
    experience:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;