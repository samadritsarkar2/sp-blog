const express = require("express"),
      router = express.Router();

const {createPost, getPostbyId, getPost, deletePost, getAllPost, authorPosts} = require("../controllers/post");
const {getUserById } = require("../controllers/user");
const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("postId", getPostbyId);
router.param("userId",getUserById );

// actual routes

router.get("/post/:postId", getPost);
router.post("/post/create/:userId",isSignedin, isAuthenticated, createPost);
router.get("/posts/user/:userId", authorPosts);
router.get("/posts", getAllPost);

// update and delete

router.delete("/post/:postId/:userId", isSignedin, isAuthenticated, deletePost)

module.exports = router;