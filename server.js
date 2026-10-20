const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const applicationRoutes = require("./routes/application");
const jobRoutes = require("./routes/job");
const employerRoutes = require("./routes/employer");

const app = express();
const port = 5123;

app.use(express.json());
app.use(cors());

// INSTRUCTION: setup MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cu6_b18_pa-qv";
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log("MongoDB connection failed:", error.message));

// INSTRUCTION: setup routes
app.use("/applications", applicationRoutes);
app.use("/employers", employerRoutes);
app.use("/jobs", jobRoutes);

app.get("/", (req, res) => {
    res.send("Good luck with the exam!");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
