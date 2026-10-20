/*
    INSTRUCTION: setup the job controller with the following functions:
    - getJobs - Retrieve all jobs (use `populate()` to get employer details)
    - getJob - Retrieve a specific job (use `populate()` to get employer details)
    - addNewJob - Add a new job
    - updateJob - Update a job
    - deleteJob - Delete a job
*/
const Job = require("../models/job");
const Employer = require("../models/employer");

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("employer");
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate("employer");
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addNewJob = async (req, res) => {
    try {
        if (req.body.employer && !(await Employer.exists({ _id: req.body.employer }))) {
            return res.status(400).json({ message: "Employer not found" });
        }
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    try {
        if (!(await Job.exists({ _id: req.params.id }))) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (await Employer.exists({ job: req.params.id })) {
            return res.status(409).json({ message: "Employer have another job" });
        }
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Job deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getJobs, getJob, addNewJob, updateJob, deleteJob };
