const mongoose=require('mongoose');
const mongourl='mongodb://localhost:27017/hotels'// replace my database with your database mean hotells ka databse create kr dega agar compass mein nhi hai toh

// setupp mongodb connection
mongoose.connect(mongourl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
// set default connection 
// mongoose contain default connection object representing mongodb connection
const db=mongoose.connection; // ye db use hoga hammesa connet karne ke liye nodejs se
// db mongodb se bna hua connection hai

// event listener by keyword conneted jab mongodb server se connect ho jayega tb ye message print hoga
db.on('connected',()=>{
    console.log('connected to mongodb server');
});

db.on('error',(err)=>{
    console.log('mongodb connection error',err);
});
db.on('disconnected',()=>{
    console.log('mongodb disconnected');
});

// export the database connection
module.exports=db; // db hi main database connection hai


