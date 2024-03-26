const mongoose=require('mongoose');


const enquirySchema=mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    },
});

const enquiryModel=mongoose.model("EnquiryModel",enquirySchema);

module.exports=enquiryModel;