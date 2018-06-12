const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const signUp = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    avatar: String
});

module.exports = mongoose.model('userSignUp', signUp);
