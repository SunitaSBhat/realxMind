const {Schema, model} = require("mongoose");
const user = require("./index")
const  blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    explain:{
        type:String,
        require:true
    },
    body:{
        type:String,
        required:true
    },
    coverImageUrl:{
        type:String,
        required:false
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"

    },
    username:{
        type:String,
       

    },
}, {timestamps:true});
const blog =model("blog", blogSchema);
module.exports=blog;