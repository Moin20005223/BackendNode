const mongoose=require('mongoose');


const mongoConnect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{dbName:process.env.dbName});
        console.log('Database connected successfully!');
    }
    catch(error)
    {
        console.log("Unable to connect database:",error);
    }
};

module.exports=mongoConnect;