const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    loginId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, default: Date.now },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required :true,
    },
})

module.exports = mongoose.model("users", userSchema)