const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Message = require('./models/message');

const app = express();
const PORT = process.env.PORT || 5174;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected ✔️'))
  .catch(err => console.error('MongoDB connection error ❌', err));

// Contact route
app.post('/wrapper', async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newMessage = new Message({ name, email, phone });
    await newMessage.save();
    res.status(200).json({ message: 'Message saved to database!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
