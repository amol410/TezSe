import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import cardRoutes from './routes/cards';
import beneficiaryRoutes from './routes/beneficiaries';
import transactionRoutes from './routes/transactions';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/transactions', transactionRoutes);

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
export default app;
