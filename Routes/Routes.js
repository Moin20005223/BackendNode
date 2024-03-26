const express=require('express');
const {login,register, tryCatchMiddleware,logout, enquiry}=require('../Controller/Controller.js');
const route=express.Router();


route.post("/register",tryCatchMiddleware(register));

route.post("/login",tryCatchMiddleware(login));

route.get("/logout",tryCatchMiddleware(logout));

route.post("/enquiry",tryCatchMiddleware(enquiry));

module.exports=route;