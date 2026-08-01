"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const cards_1 = __importDefault(require("./routes/cards"));
const beneficiaries_1 = __importDefault(require("./routes/beneficiaries"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/cards', cards_1.default);
app.use('/api/beneficiaries', beneficiaries_1.default);
app.use('/api/transactions', transactions_1.default);
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Welcome to the TezSend API' });
});
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'TezSend API is running' });
});
// ✅ Start server (required for Hostinger VPS / any traditional Node host)
app.listen(PORT, () => {
    console.log(`🚀 TezSend API running on port ${PORT}`);
});
// ✅ Also export for testing / serverless adapters
exports.default = app;
