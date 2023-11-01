const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    collegeName: { type: String, required: true, unique: true },
    address: String,
    city: String,
    state: String,
    mobileNo: {
        type: Number,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Ensure that the mobileNo is a 10-digit number
            },
            message: 'Mobile number must be a 10-digit number'
        }
    }
});

module.exports = mongoose.model("colleges", collegeSchema);
