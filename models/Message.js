const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
      number: { type: Number, required: true, unique: true },
      password: {type: String, required: true },
        date: { type: Date, default: Date.now }
        });

        messageSchema.plugin(uniqueValidator);
        module.exports = mongoose.model('Message', messageSchema);
        