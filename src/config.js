const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

//check database connected or not
connect.then(()=>{
console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Databae cannot be connected.");  
})
//Create a schema
const Loginschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});
//collection part
const collection= new mongoose.model("users",Loginschema);
module.exports = collection