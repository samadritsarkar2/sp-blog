const User = require("../models/user");
//const Order  =  require("../models/order");


exports.getUserById = (req, res, next, id) =>{
    
    User.findById(id).exec((err, user)=>
    {
        if(err || !user)
        {
            return res.status(400).json({
                error : "No USer was found in DB"
            })
        }
        req.profile = user; 
        
        next();
    });
     
}

exports.getUserByUsername = (req, res, next, username) => {
  User.findOne({ username: username }).exec((err, user) => {
    if (err || !user) 
    {
      return res.status(400).json({
        error: "No USer was found in DB",
      });
    }
    req.profile = user;

    next();
  });
};

exports.getUser = (req,res) =>{
  
    // TODO: get back here for password
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined ; 
   
    return res.json(req.profile)
}

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true},
        (err, user)=>{
            if(err)
            {
                return res.status(400).json({
                    error : "error occured!"
                })
            }   
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined ;  
            return res.json(user)
         }
         )
}
 exports.getAlluser = (req,res)=>{

     User.find().exec((err, allusers)=>{
         if(err || !allusers )
         return res.json({
             error : "NO USERS FOUND"
         })
         return res.json(allusers)
     })
 }

exports.searchUser = (req, res) =>{
    req.profile.role = undefined;
    req.profile.email = undefined;
    req.profile.__v = undefined;
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined ; 
   
    return res.json(req.profile)
}