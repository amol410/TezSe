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
    const { type, upiId, accountNo, ifsc, bankName } = req.body;
    try {
        const beneficiary = await db_1.default.beneficiary.create({
            data: {
                userId: req.userId,
                type,
                upiId,
                accountNo,
                ifsc,
                bankName
            }
        });
        res.json(beneficiary);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding beneficiary', error });
    }
});
router.get('/', async (req, res) => {
    try {
        const beneficiaries = await db_1.default.beneficiary.findMany({
            where: { userId: req.userId }
        });
        res.json(beneficiaries);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching beneficiaries', error });
    }
});
exports.default = router;
