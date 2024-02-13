const dotenv= require('dotenv');
const express=require('express');
const cors=require('cors');
dotenv.config();
const app=express();
const connectDB=require('./config/conn');
const userRoutes=require('./routes/userRoutes');
const port=(process.env.PORT || 8000);
const DATABASE_URL=process.env.DATABASE_URL
app.use(cors());


//database
connectDB(DATABASE_URL);


//json
app.use(express.json());

//routes
app.use('/api/v1',userRoutes);

app.listen(port,()=>{
    console.log("localhost running on port "+port);
})
