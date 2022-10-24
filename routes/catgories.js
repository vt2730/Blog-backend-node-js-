const router = require("express").Router();
const Category = require("../models/category");

//CREATE category
router.post("/", async (req, res) => {
    const category = await Category.create(req.body);
    try {
        const savedCategory = await category.save();
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;