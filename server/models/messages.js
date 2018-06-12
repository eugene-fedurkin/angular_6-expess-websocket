const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messages = new Schema({
    messages: []
});

module.exports = mongoose.model('messages', messages);
