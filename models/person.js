const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

// define person schema
const personschema=new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     age:{
        type:Number
     },
     work:{
      type:String,
      enum:['chef','waiter','manager'],
      required:true
     },
     mobile:{
        type:String,
        required:true
     },
     email:{
      type:String,
      required:true,
      unique:true
     },
     address:{
        type:String
     },
     salary:{
      type:Number,
      required:true
     },
     username:{
       required:true,
       type:String
     },
     password:{
      required:true,
      type:String
     }
});
personschema.pre('save',async function(next){
   const person=this;

   // hash the password only if it has been modified (or is new)
   if(!person.isModified('password')) return next();

   try{
     // hash password generation
     const salt=await bcrypt.genSalt(10);

     //hash password
     const hashedpassword=await bcrypt.hash(person.password,salt);
     person.password=hashedpassword; // now here password is replaced by hashedpassword
     next();
   }catch(err){
       return next(err);
   }
})
personschema.methods.comparePassword=async function(candidatepassword){
   try{
      //use bcrypt to compare the provided password with hashed password
      const ismatch=await bcrypt.compare(candidatepassword,this.password);
      return ismatch;
   }catch(err){
      throw err;
   }
}
const person=mongoose.model('person',personschema);// created model of person name jo upar schema pe based hoga
module.exports=person;// here we have exported that model
