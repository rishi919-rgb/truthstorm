import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Basic route to test the server
app.get('/', (req, res) => {
   res.json({ message: 'TruthStorm AI API is running on Phase 11' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});