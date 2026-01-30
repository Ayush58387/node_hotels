const express=require('express');
const router=express.Router();
const Person=require('./../models/person');

router.post('/',async(req,res)=>{
  try{
  const data=req.body // request body contains person data

  //create a new person document using the mongoose model
  const newPerson=new Person(data);

  // save the newPerson to the database
  const response=await newPerson.save()
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
    const data=await Person.find()
    console.log('data fetched');
    res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})
router.get('/:worktype', async(req,res)=>{
  try{
    const worktype=req.params.worktype;
    if(worktype=='chef'||worktype=='manager'||worktype=='waiter'){
      const response=await Person.find({work:worktype});
      console.log('response fetched');
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error:'invalid worktype'})
    }
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
router.delete('/:id',async (req,res)=>{
  try{
    const personid=req.params.id ;//extract the id from the uRL parameter

    const response=await Person.findByIdAndDelete(personid)
    if(!response){
      return res.status(404).json({error:'person not found'});
    }
    console.log('data delete');
    res.status(200).json({message: 'person deleted succesfully'});
  }catch(err){
     console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})
module.exports = router;
