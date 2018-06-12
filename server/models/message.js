const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const message = new Schema({
  fromUserName: {
        type: String,
        required: [true, 'fromUserName field is required']
    },
    userAvatar: {
      type: String,
      required: [true, 'userAvatar field is required']
    },
    message: {
      type: String,
      required: [true, 'message field is required']
    },
    date: {
      type: String,
      required: [true, 'date field is required']
    },
    isEdited: {
      type: Boolean,
      required: [true, 'isEdited field is required']
    },
});

module.exports = mongoose.model('message', message);
