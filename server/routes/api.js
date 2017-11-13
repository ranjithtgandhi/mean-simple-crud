var express = require('express'),
 router = express.Router();
 
//routes for user api
router.use("/user", require("../controllers/user.api"));
router.use("/register", require("../controllers/register.api"));
router.use("/login", require("../controllers/login.api"));
 
//add here other api routes
 
module.exports = router;