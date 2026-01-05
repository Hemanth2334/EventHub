const express = require('express');
const router = express.Router();
const Organisation = require('../models/Organisation');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const mongoose = require('mongoose');

router.post('/organisations', [
    fetchuser,
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('CategoryName', 'Category cannot be empty').notEmpty(),
    body('img', 'Image URL cannot be empty').isURL(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, description, email, CategoryName, img } = req.body;
        const newOrganisation = new Organisation({
            name, description, email, CategoryName, img, owner: req.user.id 
        });
        const savedOrganisation = await newOrganisation.save();
        res.status(201).json(savedOrganisation);
    } catch (error) {
        console.error("Error saving organisation:", error.message);
        res.status(500).json({ error: "Server Error: Could not save the listing." });
    }
});

router.get('/my-listings', fetchuser, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }
        const listings = await Organisation.find({ owner: new mongoose.Types.ObjectId(req.user.id) });
        res.json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error.message);
        res.status(500).send("Internal Server Error");
    }
});


router.get('/organisations/:id', fetchuser, async (req, res) => {
    try {
        const listing = await Organisation.findById(req.params.id);
        if (!listing) {
            return res.status(404).send("Not Found");
        }
        
        if (listing.owner.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        res.json(listing);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


router.put('/organisations/:id', fetchuser, async (req, res) => {
    try {
        const { name, description, email, CategoryName, img } = req.body;
        const newListingData = { name, description, email, CategoryName, img };
        let listing = await Organisation.findById(req.params.id);
        if (!listing) { return res.status(404).send("Not Found"); }
        if (listing.owner.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        listing = await Organisation.findByIdAndUpdate(req.params.id, { $set: newListingData }, { new: true });
        res.json({ listing });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/organisations/:id', fetchuser, async (req, res) => {
    try {
        let listing = await Organisation.findById(req.params.id);
        if (!listing) { return res.status(404).send("Not Found"); }
        if (listing.owner.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        await Organisation.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Listing has been deleted", listing: listing });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;