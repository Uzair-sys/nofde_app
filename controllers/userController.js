const express=require('express');
const router=express.Router();
const User=require('../models/user');

router.get('/test/',(req,res)=>{
	res.send('andpoints is working');

})


//create
router.post('/create',(req,res)=>{
	const {name,institute,year} = req.body;
	User.create({
		name:name,
		institute:institute,
		year:year
	})
	.then(result=>{
		res.status(200).json({result:result});
	})
	.catch(err=>{
		res.status(400).json({error:err.message});
	})
})

//read

router.get('/show',(req,res)=>{
	const {name,institute,year} = req.body;
	User.findAll()
	.then(result=>{
		res.status(200).json({result:result});
	})
	.catch(err=>{
		res.status(400).json({error:err.message});
	})
})

//update
router.post('/update/:id',(req,res,next)=>{
	const {name,institute,year} = req.body;
	User.update(
		{name:req.body.name,institute:req.body.institute,year:req.body.year},
		{where:{id:req.params.id}}
	)
	 .then(function(rowsUpdated) {
   res.json(rowsUpdated)
 })
 .catch(next)

})



//delete
router.post('/delete/:id',(req,res,next)=>{
	// const {name,institute,year} = req.body;
	User.destroy(
		// {name:req.body.name,institute:req.body.institute,year:req.body.year},
		{where:{id:req.params.id}}
	)
	 .then(function(rowsDeleted) {
   res.json(rowsDeleted)
 })
 .catch(next)

})


module.exports=router;

