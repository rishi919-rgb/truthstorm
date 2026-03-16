import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import investigationRoutes from './routes/investigationRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '20mb' }));
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/investigations', investigationRoutes);

// MongoDB Connection
const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected successfully');
   } catch (err) {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
   }
};

connectDB();

// Basic route to test the server
app.get('/', (req, res) => {
   res.json({ message: 'TruthStorm AI API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});