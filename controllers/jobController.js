const Job = require('../models/jobModel'); 

exports.postJob = async (req, res) => {
    console.log("Inside post job");
    
    // 1. Destructure fields from req.body (Assuming body is parsed correctly now)
    const { title, location, type, salary, qualification, experience, description } = req.body;
    
    // 2. Extract user email from JWT payload attached by the middleware
    const userMail = req.payload; 

    // Log all fields for debugging
    console.log("Job Fields:", title, location, type, salary, qualification, experience, description, "Posted by:", userMail);

    try {
        const existingJob = await Job.findOne({ title, userMail });

        if (existingJob) {
            return res.status(409).json("You have already posted a job with this exact title.");
        } else {
            const newJob = new Job({
                title,
                location,
                type,
                salary,
                qualification,
                experience,
                description,
                userMail // Save the admin email who posted it
            });

            await newJob.save();
            return res.status(200).json({ message: "Job Posted Successfully", newJob });
        }
    } catch (err) {
        console.error("Error posting job:", err);
        return res.status(500).json({ message: "Internal server error while posting job.", error: err.message });
    }
};