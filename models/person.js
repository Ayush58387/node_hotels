const mongoose=require('mongoose');

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
     }
});
const person=mongoose.model('person',personschema);// created model of person name jo upar schema pe based hoga
module.exports=person;// here we have exported that model
