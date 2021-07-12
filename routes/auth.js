// const express = require("express");
// const router = express.Router();
// const  {check , validationResult} = require('express-validator');
// const {signout,signup, signin, isSignedIn} = require("../controllers/auth");

// // SIGNUP ROUTE
// router.post('/signup',[
//     check("name", "Name should be atleast 3 characters long.").isLength({min:3}),
//     check("email","email is required").isEmail(),
//     check("password","Password should be atleast 3 characters long.").isLength({min:3})
// ],signup);

// // Signin route
// router.post('/signin',[
//     check("email","email is required").isEmail(),
//     check("password","Password Field is required").isLength({min:1})
// ],signin);

// router.get('/signout',signout);

// // protected routes
// router.get('/protected', isSignedIn, (req, res)=>{
//     return res.json({
//         message: "Protected route this is"
//     });
// })


// module.exports = router;



var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
