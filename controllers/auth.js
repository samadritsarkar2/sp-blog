const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req,res)=>{
    const errors = validationResult(req);
   if(!errors.isEmpty()){
        return res.status(422).json({ error : errors.array()[0].msg }); 
   }
   
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
          if(err.code == 11000)
          {
            return res.status(400).json({
                error : "Email  or Username already exists"
            }); 
          } 
          return res.status(400).json({
            error : "Something Missing"
        }); 
        }
        res.json({
            name : user.name,
            username : user.username,
            email : user.email,
            id : user._id
        });
    })
    
}

exports.signin = (req, res) => {
  const { email, password } = req.body;
  console.log("hit signin");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error : errors.array() });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email doesnt exist"
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email or Password doesnot match"
      })
    }
     // Create token
     const token = jwt.sign({_id : user._id }, process.env.SECRET);
     //put token in cookie
     res.cookie("token", token, {expires : new Date(Date.now() +  9999) });

     // Sending response to frontend
     const {_id, name,username , email, role } = user;
     return res.json({ token, user : { _id, name, username, email, role}});

  });
};



exports.signout= (req,res)=>{
    res.clearCookie("token");

    return res.json({
      message : "USER signout successfully"
    })
}

// protected routes

exports.isSignedin = expressJwt({
  secret : process.env.SECRET,
  userProperty : "auth"
})


// custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req,res, next) =>{
  if(req.profile.role ===  0 ){
    return res.status(401).json({
      error : "ADMIN Privileges required. ACCESS DENIED"
    })
  }
  next();
}
