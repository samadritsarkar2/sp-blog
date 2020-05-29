const Post = require('../models/post');
const {IncomingForm} = require("formidable");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const User = require("../models/user");


cloudinary.config({
    cloud_name: 'sanganan-prayog',
    api_key: '155839762434236',
    api_secret: process.env.CLOUDINARY_SECRET
  });

exports.getPostbyId = (req,res, next, id) =>{
    Post.findById(id)
    .exec((err,post)=>{
        if(err){
            return res.status(400).json({
                error : "Post not found"
            });
        }
        req.post = post;
        next();
    })
}  


exports.createPost = (req, res) => {
  let form = new IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image!!",
      });
    }
    // destructure the fields
    const { title, post_text } = fields;

    if (!title || !post_text) {
      return res.status(400).json({
        error : "Please include all fields",
      });
    }


    
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    let post = new Post(fields);

    post._user = req.profile;
    post.author = req.profile.username;
    post.image = [];

    var photo = await cloudinary.uploader.upload(
      file.image.path,
      (err, result) => {
        if (err) {
          console.log("ERROR in img upload : ", err);
        } else {
          console.log("img uploaded");
        }
      }
    );
    post.image.push({
      url: photo.secure_url,
      public_id: photo.public_id,
    });

    post.save((err, createdPost) => {
      if (err) {
        return res.status(400).json({
          error: "Saving Post failed in DB",
          errorMessage: err.message,
        });
      };
      User.findByIdAndUpdate(
        { _id: req.profile._id },
        {
          $push: {
            posts: createdPost,
          },
        },
        { new: true },
        (err, user) => {
          if (err) {
            return res.status(400).json({
              error: "error occured! cant push post into user",
            });
          }
        }
      );


      return res.json(createdPost);
      
    });
  });
};

exports.getPost = (req,res) => {
    return res.json(req.post)
}

exports.deletePost = async (req,res) => {

    if( req.profile.role || req.profile._id.toString() == req.post._user._id.toString())
    {
        Post.findById(req.post._id, (err, delPost) => {
          if (err) {
            return res.json({ error: "UNABLE to find/delete Post", err });
          }
        })
        .then(response => {
          cloudinary.uploader.destroy(response.image[0].public_id)
          .then(deleted =>{
            response.remove();
            return res.json({message : `Deleted post :- ${response.title}`})
          })
        })
        .catch(err => {
          return res.status(400).json({ error: "UNABLE to find/delete Post", err })
        })
    }
    else
    {return res.json({error : "ACCESS DENIED !! You cannot delete others post"})
    }

    
}

exports.getAllPost = (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0 ; 
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Post
    .find()
    .skip(skip)
    .sort({createdAt: "desc"})
    .limit(limit)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: "NO POST Found",
        });
      }
      return res.json(posts);
    });
}

exports.authorPosts = (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0 ; 
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Post
    .find({author : req.profile.username})
    .skip(skip)
    .sort({createdAt: "desc"})
    .limit(limit)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: "NO POST Found",
        });
      }
      return res.json(posts);
    });
}