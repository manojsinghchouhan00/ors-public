const mongoose = require('mongoose');
const markSchema = new mongoose.Schema({

    "name": {type : String, require : true },

    "studentId": { type : String, require : true , unique : true },

    "rollNo": {type : String, require : true , unique : true },

    "physics": { type : String},

    "chemistry": { type : String},

    "maths": { type : String},

});
 module.exports = mongoose.model("marksheet",markSchema )