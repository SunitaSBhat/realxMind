const express = require('express');
const path = require("path");
const app = express();
const mongoose=require("mongoose");
const blog = require("./models/blog");
const user = require("./models/index");
const dotenv=require("dotenv").config();
const {checkloggedinUser}= require("./middleware/index");
const cookieParser=require("cookie-parser")
const userRouter = require("./routers/index");
const PORT = process.env.PORT || 8000;
mongoose.connect( "mongodb://127.0.0.1:27017/blogify") .then(() => {
    console.log("Mongoose connected");
})
.catch((error) => {
    console.error("Mongoose connection error:", error);
});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: true }));

app.use('/avat', express.static(path.join(__dirname, 'avat')));
app.use(cookieParser());
app.use(checkloggedinUser("token"));

app.get("/", async(req, res)=>{
    try{
    const allblogs = await blog.find({});
   
    console.log(req.user);
     return res.render("home", {
         user:req.user,
        
         blogs:allblogs
        
     });
     
    }
    catch(error){
        console.error(error);
    }
    
});
app.use("/user", userRouter);
app.listen(PORT, (req, res)=>{
    console.log(`server is running in ${PORT}`)
});