const Express = require("express");
const Menu = require("../models/Menus");
const { authenticateToken: authMiddleware } = require("../middleware/authMiddleware");
const { log } = require("console");

const router = Express.Router();

// GET ALL MENUS
router.get("/", authMiddleware, async (req, res) => {
  try{
    const menus = await Menu.find();
    res.json(menus)
    console.log("menu:", menus)
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
})

// GET Menu
// router.get("/:_id", authMiddleware, async (req, res) => {
//   try {
//     const menu = await Menu.findById(req.params._id);
//     res.json(menu);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Update Menu
router.put("/:_id", authMiddleware, async (req, res) => {
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params._id,
      { visibility: req.body.visibility },
      { new: true }
    );
    if (!updatedMenu) return res.status(404).json({ message: "Menu not found" });
    res.json(updatedMenu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.delete("/:_id", authMiddleware, async (req, res) => {
//   try {
//     const deleted = await Menu.deleteOne({ _id: req.params._id });

//     if (deleted.deletedCount === 0) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     res.json({ message: "Item deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });




module.exports = router;
