const express = require("express");

const Project =
    require("../models/Project");

const router = express.Router();


router.get("/", async (req, res) => {

    try {

        const projects =
            await Project.find();

        res.json(projects);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


router.post("/", async (req, res) => {

    try {

        const project =
            new Project(req.body);

        const savedProject =
            await project.save();

        res.status(201).json(savedProject);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


router.delete("/:id", async (req, res) => {

    try {

        await Project.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Project deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;