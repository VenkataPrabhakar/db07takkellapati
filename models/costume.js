const mongoose = require("mongoose") 
const costumeSchema = mongoose.Schema({ 
 costume_type: String, 
 size: {
    type: String,
    maxlength: 10
},  
 cost: {
    type: Number,
    min: 100,
   max: 1000
} 
}) 
 
module.exports = mongoose.model("Costume", costumeSchema) 