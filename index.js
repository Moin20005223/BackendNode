const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv').config({path:'./config.env'});
const databaseConnect=require('./Database/Database.js');
const route = require('./Routes/Routes.js');
const cookieParser=require('cookie-parser');
const app=express();

databaseConnect();

app.use(cors({
    origin:"https://waterbottlesales.netlify.app",
    credentials:true
// origin:"http:localhost:3000"
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use("/",route);

app.listen(process.env.PORT,process.env.URL,()=>`Connection work on port ${process.env.PORT}`);