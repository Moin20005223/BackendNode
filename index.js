const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv').config({path:'./config.env'});
const databaseConnect=require('./Database/Database.js');
const route = require('./Routes/Routes.js');
const cookieParser=require('cookie-parser');
const app=express();

databaseConnect();

app.use(cors({credentials:true,
// origin:"https://frontend-enjl.onrender.com"
origin:"http://localhost:8100"
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use("/",route);

app.listen(process.env.PORT,process.env.URL,()=>`Connection work on port ${process.env.PORT}`);