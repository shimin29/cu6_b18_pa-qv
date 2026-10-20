/*
    INSTRUCTION: setup the application schema according to the following requirements:
    - job: (ObjectId, ref: 'Job', required)
    - applicantName: (String, required)
    - email: (String, required)
    - phone: (String, required)
    - appliedDate: (Date, default: Date.now)
*/

const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        applicantName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        appliedDate: {
            type: Date,
            dafault: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("Application", applicationSchema);
