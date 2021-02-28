const mongoose = require("mongoose");


module.exports.db=mongoose.connect('mongodb://localhost/demo',{

useUnifiedTopology:true,
useNewUrlParser:true


})
