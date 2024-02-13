const mongoose=require('mongoose');

module.exports.connectDB=async (DATABASE_URL)=>{
    try{
        const DB_OPTIONS={
            dbName:"geekshop"
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log('Db connected successfully '+DATABASE_URL);
    }
    catch(error){
        console.log(error);
    }
}

