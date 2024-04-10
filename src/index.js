const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config")
const app = express();
//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));


app.set('view engine','ejs');
//static field
app.use(express.static("public"));


app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.get("/",(req,res)=>{
    res.render("login");
});

app.post("/signup",async(req,res)=>{
    const data = {
        name : req.body.username,
        password : req.body.password
    }

    //check if userdata already exists in the database
    const existingUser = await collection.findOne({name:data.name});
    if(existingUser){
        res.send("User already exists. Please choose a different username.");
    }
    else{
        //hash the password
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(data.password,saltRound);
        data.password = hashedPassword;
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
}
)

//user login 
app.post("/login", async (req, res) => {
    console.log('login');
    try{
    const check = await collection.findOne({name: req.body.username});
    if(!check) {
        res.send("user name cannot found");
    }
    //compare the hash password from the database with the plain text
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if(isPasswordMatch) {
        res.render("home");
    }else {
        req.send("wrong password");
    }
    }catch{
    res.send("wrong Details");
    };
});

const port = 5000;
app.listen(port, (req, res) => {
    console.log('listening on port 3000......')
})