const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (
            !name?.trim() ||
            !email?.trim() ||
            !subject?.trim() ||
            !message?.trim()
        ) {
            return res.status(400).json({
                message: "Please fill in all fields."
            });
        }

        const savedMessage = await Message.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            message: "Your message was saved successfully.",
            id: savedMessage._id
        });
    } catch (error) {
        console.error("Error saving contact message:", error);

        res.status(500).json({
            message: "Unable to save your message."
        });
    }
});

module.exports = router;