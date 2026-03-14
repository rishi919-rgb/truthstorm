import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

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