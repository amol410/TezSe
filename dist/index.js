"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const cards_1 = __importDefault(require("./routes/cards"));
const beneficiaries_1 = __importDefault(require("./routes/beneficiaries"));
const transactions_1 = __importDefault(require("./routes/transactions"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/cards', cards_1.default);
app.use('/api/beneficiaries', beneficiaries_1.default);
app.use('/api/transactions', transactions_1.default);
// Legal static pages placeholder
app.use('/legal', express_1.default.static(path_1.default.join(__dirname, '../public/legal')));
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'Welcome to the TezSend API' });
});
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'TezSend API is running' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
