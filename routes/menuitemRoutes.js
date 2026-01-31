const express = require('express');
const router=express.Router();
const menuitem=require('./../models/menuitems');

router.post('/',async(req,res)=>{
  try{
  const data=req.body // request body contains menuitem data

  //create a newmenu document using the mongoose model
  const newmenu=new menuitem(data);

  // save the newmenu to the database
  const response=await newmenu.save()
  console.log('data saved');
  res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})
router.get('/', async(req,res)=>{
  try{
    const data=await menuitem.find()
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})
// put method is used to update the data
// put method use get and post to update the data by gettting the data first using get data
// and then post the change in postman what it want then on using put it update data
router.put('/:id',async (req,res)=>{
  try{
    const personid=req.params.id ;//extract the id from the uRL parameter
    const updatedpersondata=req.body;

    const response=await Person.findByIdAndUpdate(personid,updatedpersondata,{
      new:true,
      runvalidators:true,

    })
    if(!response){
      return res.status(404).json({error:'person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);
  }catch(err){
     console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})
// comment added
module.exports=router;