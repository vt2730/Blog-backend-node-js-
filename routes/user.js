const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

//UPDATE user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to update this user" });
  }
});

//DELETE  user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {//for deleting this user all posts as this user is deleted
      const user = await User.findById(req.params.id);
      try {
          await Post.deleteMany({username: user.username});
         await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("user not found");
    }
  } else {
    res
      .status(401)
      .json({ message: "You are not authorized to delete this user" });
  }
});

//GET user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
