const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({

    "firstName": String,
    "lastName": String,
    "emailId": { type: String, require: true, unique: true },
    "collegeId": { type: String, unique: true },
    "mobileNo": {
        type: Number,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Mobile number must be a 10-digit number'
        }
    }
})
module.exports = mongoose.model("students", studentSchema)