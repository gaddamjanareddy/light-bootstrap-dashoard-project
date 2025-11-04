const Express = require("express");
const User = require("../models/User");
const { authenticateToken: authMiddleware } = require("../middleware/authMiddleware");

const router = Express.Router();

// GET ALL USERS
router.get("/", authMiddleware, async (req, res) => {
  try{
    const users = await User.find();
    res.json(users)
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
})

// GET profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
