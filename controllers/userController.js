const express=require('express');
const router=express.Router();
const User=require('../models/user');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const schema = require("../helper/Validation");
require("../config/passport")(passport);
const hashPassword = require("../helper/hash");
const setProfile = require("../helper/profile").setProfile

router.get('/test/',(req,res)=>{
	res.send('andpoints is working');

})


//sigup api
router.post('/email/signup', async(req,res)=>{
	const { name, institute,year,email,password } = req.body;
	// console.log(password);
	 try {

    //Check required fields
    // const value = await schema.validateAsync({
    //   name,
    //   institute,
    //   year,
    //   email,
    //   passowrd
    // });
    // console.log(name);

     //Validation passed
    User.findOne({ where: { email: email } }).then(async user => {
      if (user) {
        //User exists
        res.status(400).json({ errors: [{ msg: "user already exist" }] });
        //  res.json({ user });
      } else {
        const hash = await hashPassword(password);
        // console.log(hash);
        console.log("In controller " + hash);
        User.create({
          name: name,
          institute: institute,
          year:year,
          email: email,
          password: hash,
          
        })

      .then(user => {
            //  console.log(user);
            req.login(user, { session: false }, function(error) {
              if (error) return next(error);
              // console.log('Request Login supossedly successful.');
              //   console.log("Request Login supossedly successful.");
              const payload = {
                user: {
                  id: user.id
                }
              };
              const token = jwt.sign(payload, "jwt-secret", {
                expiresIn: "48h"
              });
              return res.status(200).json({ token });
            });
            // res.status(200).send(true);
          })
          .catch(err => res.status(500).json({ errors: [{ msg: err, order:"first" }] }));
      }
    });
  } catch (err) {
    res.status(400).json({ errors: [{ msg: err.message, order:"second" }] });
  }
});

/**
 * @api {post} /auth/email/signin Sign in user
 * @apiName SigninUser
 * @apiGroup AuthAPI
 */
//Login Handle
router.post("/email/signin", function(req, res, next) {
	 // console.log(req.body);
  passport.authenticate("local", { session: false }, function(err, user, info) {
   

    if (info) {

      res.status(400).json({ errors: [{ msg: info.message }] });
      	// console.log(user);
    // console.log('Request Login supossedly successful.');
    }
    if (user) {

      req.login(user, { session: false }, function(error) {
        if (error) {
          return res.send(error);
        }
       
        //   console.log("Request Login supossedly successful.");
        //console.log(user);
        const payload = {
          user: {
            id: user.id
          }
        };
        const token = jwt.sign(payload, "jwt-secret", { expiresIn: 360000 });
        return res.status(200).json({ token });
      });
    }
  })(req, res, next);
});



//get profile with token


router.get("/profile", function(req, res, next) {
  passport.authenticate("jwt", { session: false }, function(err, user, info) {
    if (err) {
      res.json(err);
    }
    if (info || !user) {
      console.log("hello", info);
      res.status(400).json({ errors: [{ msg: info.message }] });
    }
    if (user) {
      let profile= setProfile(user);
      console.log("Result"+profile.firstname);
      res.status(200).json(profile);
    }
  })(req, res, next);
});







router.get(
  "/facebook/signin",
  passport.authenticate("facebook", { scope: ["email"] })
);
/**
 * @api {get} /auth/facebook/signin/return Facebook Signin return
 * @apiName FacebookSignin
 * @apiGroup AuthAPI
 */
router.get(
  "/facebook/signin/return",
  passport.authenticate("facebook", { session: false }),
  function(req, res) {
    console.log("Req.user" + req.user);

    const payload = {
      user: {
        id: req.user.user_id
      }
    };
    const token = jwt.sign(payload, "jwt-secret", { expiresIn: "2h" });

    console.log(token);
    res.cookie("auth", token);
    res.redirect(`http://127.0.0.1:5500/authcheck.html`);
    //res.status(200).send(true);
  }
);






// //read

// router.get('/show',(req,res)=>{
// 	const {name,institute,year} = req.body;
// 	User.findAll()
// 	.then(result=>{
// 		res.status(200).json({result:result});
// 	})
// 	.catch(err=>{
// 		res.status(400).json({error:err.message});
// 	})
// })

// //update
// router.post('/update/:id',(req,res,next)=>{
// 	const {name,institute,year} = req.body;
// 	User.update(
// 		{name:req.body.name,institute:req.body.institute,year:req.body.year},
// 		{where:{id:req.params.id}}
// 	)
// 	 .then(function(rowsUpdated) {
//    res.json(rowsUpdated)
//  })
//  .catch(next)

// })



// //delete
// router.post('/delete/:id',(req,res,next)=>{
// 	// const {name,institute,year} = req.body;
// 	User.destroy(
// 		// {name:req.body.name,institute:req.body.institute,year:req.body.year},
// 		{where:{id:req.params.id}}
// 	)
// 	 .then(function(rowsDeleted) {
//    res.json(rowsDeleted)
//  })
//  .catch(next)

// })


module.exports=router;

