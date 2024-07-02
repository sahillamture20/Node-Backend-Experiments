const mongoose = require('mongoose');

const User = mongoose.model('User', { //User become users in the mongodb [becomes pural form of modal name]
    name: String,
    email: String,
    password: String,
    phone: Number,
    isMinor: Boolean
})

module.exports = User