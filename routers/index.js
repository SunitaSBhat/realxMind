const {Router}=require("express");
const path = require("path");
const express = require('express');
const app=express();
const router = Router();
const user=require("../models/index");
const { createToken, verifyToken}= require("../services/auth");
const blog = require("../models/blog");
const multer= require("multer");
const fs = require("fs");
const Comment = require("../models/comments");

router.get("/signin", (req, res)=>{
     return res.render("signin");
});
router.get("/signup", (req, res)=>{
    return res.render("signup");
});
router.post("/signin", async(req, res)=>{
   // console.log(req.body);
    const {fullname, email, password, bio, Passion, Age}=req.body;
   try{ 
   const newUser= await user.create({
        fullname:fullname,
        email:email,
        password:password,
        bio:bio,
        Passion:Passion,
        Age:Age
    });
    console.log(newUser);
    
   // console.log(yy);zz
} catch (error) {
    console.error('Error creating user:', error);
}

return res.json("user created");
});
router.post("/signup", async(req, res)=>{
    const {email, password} = req.body;
    try{
    const token = await user.matchPassword(email, password);
    
    return res.cookie("token", token).redirect("/user/addblog")
    }
    catch(error){
        return res.render("signup", {
            error:"invalid username or password"
        }
        )}
})
router.get("/logout", (req, res)=>{
    res.clearCookie("token").redirect("/")
})
router.get("/addblog", (req, res)=>{
    return res.render("addblog");
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    const destination= path.resolve(__dirname, '../avat')
    fs.mkdirSync(destination, { recursive: true });
    cb(null, destination);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
router.post("/addblog", upload.single('coverImageUrl'), async(req, res)=>{
    // console.log(req.file);
    try{
    const {title, explain, body, username}=req.body
    const blogs=await blog.create({
        coverImageUrl:`/avat/${req.file.filename}`,
        title:title,
        explain:explain,
        body:body,
        createdBy:req.user._id,
        username:username
    });
    await user.findByIdAndUpdate(req.user._id, { $push: { posts: blogs._id } });

    // Fetch the user along with their populated posts
    const users = await user.findById(req.user._id).populate('posts');

    console.log('User:', users.posts);
    console.log('hai');

    // Render the profile page with user data
    res.render('profile', { user });
}
    catch(error)  {
        console.error('Error finding user:', error);
        res.status(500).send('Server error');
    }
   
    // req.user.posts.push(post._id);
    // await req.user.save();
    //return res.json(blogs);
     
});
router.get("/setting", async(req, res)=>{
    if(!req.user){
       res.render("alert");
    }
    else{
    const use=await user.findById(req.user._id)
    .then(use=>{
        res.render("setting", {use});
    }).catch((error)=>{
        console.log(error);
    })
    }
    
});
router.post("/setting", async(req, res)=>{
    try{
    const{fullname, email}=req.body;
    const using=await user.findByIdAndUpdate(req.user._id, {
        fullname:fullname,
        email:email
    }, {new:true})
    console.log(using.fullname);
       return res.redirect("/");
}
catch(error){
    console.log(error);
}
})
router.get("/:id", async(req, res)=>{
    try{
    const ids= req.params.id;
    const Blog= await blog.findById(ids).populate("createdBy");
    const comment=await Comment.find({blogId:Blog._id}).populate("createdBy");
    console.log(comment);
    
    console.log(Blog);
    return res.render("blog", {
        user:req.user,
        Blog,
        comment,
    });
    
}
catch(error){
    console.error(error);
}
})
router.post("/:id", async(req, res)=>{
    console.log(req.body.contents);
    const comma = await Comment.create({
        contents:req.body.contents,
        blogId:req.params.id,
        createdBy:req.user._id,
    })
    console.log(comma);
    return res.redirect("/");
});
router.get("/profile/:id", async(req, res)=>{
    console.log("hey");
    const users = await user.findById(req.user._id).populate('posts');
    console.log(users.posts);

   return res.render("profile", {
    user:users
   })

});
router.get("/form/:id", async(req, res)=>{
    const using=user.findById(req.params._id);
    res.render("form", {using});
});
router.post("/form/:id", async(req, res)=>{
    console.log(req.body);
    const {bio, Passion, Age}=req.body;
   const us=user.findByIdAndUpdate(req.user._id, {
      bio:bio,
      Passion:Passion,
      Age:Age,
   }, {new:true})
   console.log(us.bio);
   return res.redirect(`/user/profile/${req.user._id}`);
});     
router.get("/search/:id", async(req, res)=>{
    const idBlog = await blog.find({createdBy:req.params.id});
    console.log(idBlog);
    app.use(express.static('avat', {
        setHeaders: (res, path) => {
          if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'text/javascript');
          }
        },
      }));
    return res.render("idBlogs", {
        idBlog:idBlog
    })
});

module.exports=router;
