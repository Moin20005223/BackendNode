const authModel=require('../Model/AuthModel.js');
const enquiryModel=require('../Model/EnquiryModel.js');

const bcrypt = require('bcrypt');

async function register(req,res)
{
    const body=req.body;
    console.log(body)
    const user=await authModel.findOne({email:body.email});
    if(user)
    {
          res.send({register:false,message:"User already registered"});
    }
    else
    {
        const {name,email,password}=req.body;;
        const hashpassword=await bcrypt.hash(password,10);
        let created=await authModel.create({name,email,password:hashpassword});
        await created.save();
        res.send({register:true,message:"User registered successfully!"})
    }
} 

async function login(req,res)
{
    const body=req.body;
    const user=await authModel.findOne({email:body.email});
    if(user)
    {
        const compare=await bcrypt.compare(body.password,user.password)
        if(compare)
        {
            res.cookie("username",user.email,{maxAge:900000,httpOnly:true});
            res.send({login:true,message:"User loggined"});
        }
        else
          res.send({login:false,message:"Password Incorrect!"});
    }
    else
    {
        res.send({login:false,message:"User not registered!Kindly register!"})
    }
} 

async function logout(req,res)
{
    const cookies=req.cookies.username;
    console.log("work",req.cookies);
    if(cookies)
    {
       res.cookie("username","",{expires:new Date(Date.now()),httpOnly:true});
       res.send({msg:"cookies removed",cookiesRemoved:true});
       return;
    }
    res.send({msg:"No cookies found",cookiesRemoved:false});
} 

async function enquiry(req,res)
{
    const data=req.body;
    console.log(data);
    if(data)
    {
       const form=new enquiryModel(data);
       await form.save();
       res.send({msg:"Enquiry Saved",enquiry:true});
       return;
    }
    res.send({msg:"Enquiry not received",enquiry:false});
} 
function tryCatchMiddleware(handler)
{
    return async (req,res)=>{
        try
        {
           await handler(req,res);
        }
        catch(err)
        {
            console.error('An error occurred:', err);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports={register,login,tryCatchMiddleware,logout,enquiry};