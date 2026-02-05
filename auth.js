const express = require('express');// ye express library import karta hai
const app = express(); // sara server ko handle app hi karta hai ab sari functionality aa jati hai
const { jwtAuthMiddleware } = require('./jwt');

const db = require('./db'); // 👈 ye line zaroor honi chahiye
require('dotenv').config();

//authentication using middleware:-passport
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const person=require('./models/person');

const menuitem=require('./models/menuitems')
const bodyParser=require('body-parser');
app.use(bodyParser.json()); // req.body ke form mein chala jata hai
// mtlb body parsor kya karna hai jis bhi form mein data aata hai usko bs bat do jaise json fir wousko javasript object mein covert karke usko request ke from mein store kar lega jiska hum use karege.
const PORT=process.env.PORT||3000


// middleware function:- which tell how the backend process is going like on ordering food,how the food is making
// 
const logRequest=(req,res,next)=>{
 console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);

  next();
}
app.use(logRequest); // logRequest is that which contain the data of means record like time that when this url is clicked

//password verification
passport.use(new LocalStrategy(async (username,password,done)=>{
  //authentication login here
  try{
    //console.log('received credentials:',username,password);
      const user= await person.findOne({username:username});
      if(!user)
        return done(null,false,{message:'incorrect username.'});

      const ispasswordmatch= await user.comparePassword(password);
      if(ispasswordmatch){
        return done(null,user);
      }else{
        return done(null,false,{message:'incorrect password.'});
      }  
  }catch(err){
    return done(err);
  }
}));

app.use(passport.initialize());
const localauthmiddleware=passport.authenticate('local',{session:false});

app.get('/' ,function(req,res){
  res.send('welcome to our hotel');
})

 // import the router files
 const personroutes=require('./routes/personRoutes')
 app.use('/person',jwtAuthMiddleware,personroutes);

 //impport router files for menuitem
 const menuitemRoutes=require('./routes/menuitemRoutes')
 app.use('/menu',jwtAuthMiddleware,menuitemRoutes);
app.listen(PORT, () => {
  console.log('listening on port 3000');
});
module.exports=passport;//export configured passport
