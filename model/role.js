const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
    name : { type :String, require:true,unique:true},
    discription : String
});

module.exports = mongoose.model("roles",roleSchema)