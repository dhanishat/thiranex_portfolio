const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Alex Morgan Portfolio API is running!");
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("Connected to MongoDB");

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });

    })
    .catch(error => {

        console.error(
            "MongoDB connection failed:",
            error
        );

    });