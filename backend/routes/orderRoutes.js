import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

/* ===========================
   CREATE ORDER
=========================== */
router.post("/", async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ type: "validation", errors });
        }
        console.error("ORDER ERROR:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
});

export default router;
