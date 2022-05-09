const mongoose = require('mongoose')

var mongoDBURL = 'mongodb+srv://Riteeshram:Riteeshram@cluster0.hz5fg.mongodb.net/mern-ecommerce'

mongoose.connect(mongoDBURL , {useUnifiedTopology:true , useNewUrlParser:true})

var dbconnect = mongoose.connection

dbconnect.on('error' , ()=>{
    console.log(`Mongo DB Connection Failed`);
})

dbconnect.on('connected' , ()=>{
    console.log(`Mongo DB Connection Successfull`);
})

module.exports = mongoose