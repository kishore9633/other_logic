const mongoose = require('mongoose');

authorschema =new mongoose.Schema({
    name:{
        required:true,
        type: String,
    
    },
    age:{
        required:true,
        type:Number
    },
    Phone:{
        required:true,
        type:Number
    }
})

 module.exports.authormodel = mongoose.model('authors',authorschema)