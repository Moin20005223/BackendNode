const mongoose=require('mongoose');


const registerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
});

const authModel=mongoose.model("AuthModel",registerSchema);

module.exports=authModel;