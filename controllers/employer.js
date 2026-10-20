/*
    INSTRUCTION: setup the employer controller with the following functions:
    - getEmployers - Retrieve all employers
    - getEmployer - Retrieve a specific employer
    - addNewEmployer - Add a new employer
    - updateEmployer - Update an employer
    - deleteEmployer - Delete an employer
*/

const Employer = require("../models/employer");

//Get All EMPLOYERS
const getEmployers = async (req, res) => {
    try {
        const employers = await Employer.find({});
        res.status(200).json(employers);
    } catch (error) {
        console.error("Get Employers Error:", error);
        res.status(500).json({
            message: "Failed to get employers",
        });
    }
};

//Get EMPLOYER By Id
const getEmployer = async (req, res) => {
    const employer = await Employer.findOne({ _id: req.params.id });
    res.json(employer);
};

//Add New EMPLOYER
const addNewEmployer = async (req, res) => {
    try {
        const employer = await Employer.create(req.body);
        res.status(201).json(employer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Update EMPLOYER
const updateEmployer = async (req, res) => {
    try {
        const employer = await Employer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!employer) return res.status(404).json({ message: "Employer not found " });
        res.status(200).json(employer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete EMPLOYER
const deleteEmployer = async (req, res) => {
    try {
        if (!(await Employer.exists({ _id: req.params.id }))) {
            return res.status(404).json({ message: "Employer not found" });
        }
        await Employer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Employer deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getEmployers, getEmployer, addNewEmployer, updateEmployer, deleteEmployer };
