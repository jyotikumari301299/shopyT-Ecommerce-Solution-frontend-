const User = require("../models/user");
const {check, validationResult} = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

// SIGNUP METHOD
exports.signup = (req, res)=>{

// CHECKING FOR VALIDATION ERRORS
// 422 is the ERROR CODE FOR DATABASE ERRORS
const errors = validationResult(req);
if(!errors.isEmpty())
{
    return res.status(422).json({
        error: errors.array()[0].msg
    });
}

    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: "not able to save user in DB"
            });
        }
         return res.json({
             name: user.name,
             email: user.email,
             id: user._id
         });
    });   
}

// SIGNIN METHOD
exports.signin = (req,res)=>{
    const {email, password} = req.body;
     
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({email}, (err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "USER does not exists"
            });
        }

        // email and password ko authenticate check kr rha h
        // yha pr hm ye check kr rhe h ki isi user ka ye password h ya nhi
            if(! user.authenticate(password)){
                return res.status(401).json({
                    error: "Email and Password does not match"
                });
            }
            // generating token for signin
            const token = jwt.sign({_id: user._id},process.env.SECRET);
            // put token in cookie
            res.cookie("token",token,{expire: new Date() + 9999});
        
            // send response to the frontend
            const {_id, name, email, role} = user;
            res.json({
                token, user: {_id, name, email, role}
            });
       
    });
}

// SIGNOUT METHOD
exports.signout = (req,res)=>{
    res.clearCookie()
    return res.json({
        message: "User signout successfully"
    });
};

// PROTECTED ROUTES
// express-jwt json web token ko verify krwata h
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
});

// CUSTOM MIDDLEWARES
exports.isAuthenticated = (req, res, next)=>{
  // console.log(req.profile);
  // console.log(req.auth);
  // console.log(req.profile._id);
  // console.log(req.auth._id);
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker)
    {
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
}

exports.isAdmin = (req, res, next)=>{
    if(req.profile.role == 0)
    {
        return res.status(403).json({
            error: "You are not ADMIN , ACCESS DENIED"
        });
    }
    next();
}



