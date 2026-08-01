"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
router.use(auth_1.authenticate);
router.post('/', async (req, res) => {
    const { token, last4, network } = req.body;
    try {
        const card = await db_1.default.card.create({
            data: {
                userId: req.userId,
                token,
                last4,
                network
            }
        });
        res.json(card);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding card', error });
    }
});
router.get('/', async (req, res) => {
    try {
        const cards = await db_1.default.card.findMany({
            where: { userId: req.userId }
        });
        res.json(cards);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching cards', error });
    }
});
exports.default = router;
