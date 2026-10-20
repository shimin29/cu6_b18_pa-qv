/*
    INSTRUCTION: setup the controller functions to handle job applications
    - getApplicationsByJob - Retrieve all applications for a specific job (use `populate()` to get job details)
    - createApplication - Create a new application for a job (ensure no duplicate applications for the same email and job)
*/
const Application = require("../models/application");
const Job = require("../models/job");

const getApplicationsByJob = async (req, res) => {
   try {
        if (!(await application.exists({ _id: req.query.id }))) {
            return res.status(404).json({ message: "Application not found" });
        }
        const jobs = await Job.find({ _id: req.query.id }).sort({
         postedDate: 1,
        });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createApplication = async (req, res) => {
    try {
        const application = await Application.create(req.body);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getApplicationsByJob, createApplication };
