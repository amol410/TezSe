"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const db_1 = __importDefault(require("../db"));
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
// 2% convenience fee for MVP
const CONVENIENCE_FEE_RATE = 0.02;
router.use(auth_1.authenticate);
router.post('/calculate-fee', (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount' });
    }
    const convenienceFee = amount * CONVENIENCE_FEE_RATE;
    const totalAmount = amount + convenienceFee;
    res.json({
        amount,
        convenienceFee,
        totalAmount
    });
});
router.post('/initiate', async (req, res) => {
    const { beneficiaryId, amount } = req.body;
    if (!beneficiaryId || !amount) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const convenienceFee = amount * CONVENIENCE_FEE_RATE;
    const totalAmount = amount + convenienceFee;
    try {
        // 1. Create transaction record in DB
        const transaction = await db_1.default.transaction.create({
            data: {
                userId: req.userId,
                beneficiaryId,
                amount,
                convenienceFee,
                totalAmount,
                status: 'PENDING'
            }
        });
        // 2. Mock Airpay order creation
        // In a real scenario, you would call the Airpay API here.
        const mockAirpayOrderId = `AIRPAY_${crypto_1.default.randomBytes(8).toString('hex').toUpperCase()}`;
        // Update transaction with Airpay order ID
        await db_1.default.transaction.update({
            where: { id: transaction.id },
            data: { airpayOrderId: mockAirpayOrderId }
        });
        // Return the required details for the client to proceed with Airpay checkout
        res.json({
            transactionId: transaction.id,
            airpayOrderId: mockAirpayOrderId,
            totalAmount,
            currency: 'INR'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error initiating transaction', error });
    }
});
router.get('/history', async (req, res) => {
    try {
        const transactions = await db_1.default.transaction.findMany({
            where: { userId: req.userId },
            include: { beneficiary: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
});
exports.default = router;
