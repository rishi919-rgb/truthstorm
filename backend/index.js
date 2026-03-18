import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import investigationRoutes from './routes/investigationRoutes.js';

dotenv.config();

const app = express();

// CORS — allow Netlify frontend and localhost dev
const allowedOrigins = [
   'https://truthstorm.netlify.app',
   'https://truthstorm.vercel.app',
   'http://localhost:5173',
   'http://localhost:3000',
];

app.use(cors({
   origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
      } else {
         callback(new Error(`CORS blocked for origin: ${origin}`));
      }
   },
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
   credentials: true,
}));

// Handle preflight for all routes
app.options('*', cors());

// Body parsing — MUST come before routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
   res.json({ message: 'TruthStorm AI API is running', version: '1.1.0' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});