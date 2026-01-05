const express = require("express");
const router = express.Router();
const Organisation = require('../models/Organisation');
const Category = require('../models/Category');

router.post('/DisplayData', async (req, res) => {
    try {
        const { searchTerm, category } = req.body;

        let filter = {};

        if (searchTerm) {
            filter.name = { $regex: searchTerm, $options: 'i' };
        }

        if (category) {
            filter.CategoryName = category;
        }

        const organizers = await Organisation.find(filter);
        const categories = await Category.find({});

        res.send([organizers, categories]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;