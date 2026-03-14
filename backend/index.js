const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/backend_week2-03')
   .then(() => console.log('Connected to MongoDB'))
   .catch((err) => console.error('Could not connect to MongoDB', err));


app.listen(3000, () => {
   console.log("test server started on port 3000");
})