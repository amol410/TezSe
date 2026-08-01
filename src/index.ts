import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import cardRoutes from './routes/cards';
import beneficiaryRoutes from './routes/beneficiaries';
import transactionRoutes from './routes/transactions';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);
app.use('/api/transactions', transactionRoutes);

// ❌ REMOVED: dotenv.config() — Vercel injects env vars automatically
// ❌ REMOVED: express.static for legal pages — put files in /public at project root instead
// ❌ REMOVED: app.listen() — Vercel handles this

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Welcome to the TezSend API' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'TezSend API is running' });
});

// ✅ REQUIRED: Export for Vercel serverless
export default app;
