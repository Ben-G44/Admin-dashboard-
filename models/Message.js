const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
    email: { type: String, required: true },
      number: { type: Number, required: true },
        date: { type: Date, default: Date.now }
        });

        module.exports = mongoose.model('Message', messageSchema);
        