const   express = require("express"),
        router  = express.Router();

const { getUserById,getUserByUsername, getUser, updateUser, getAlluser, searchUser  } = require("../controllers/user");
const {isSignedin, isAuthenticated , isAdmin } = require("../controllers/auth");


router.param("userId", getUserById);
router.param("userName", getUserByUsername);


router.get("/user/:userId",isSignedin,isAuthenticated, getUser);

// router.get("/search/user/:userId", isSignedin, isAuthenticated, searchUser);

router.put("/user/:userId",isSignedin,isAuthenticated, updateUser);

router.get("/users/:userId",isSignedin,isAuthenticated,isAdmin, getAlluser)



module.exports = router; 
