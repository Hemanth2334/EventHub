const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 7 }).withMessage("Password must be at least 7 characters"),
    body("name").isLength({ min: 5 }).withMessage("Name must be at least 5 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt)
    try {
      const user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });
      res.json({ success: true, user });
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.code === 11000) {
        return res.status(400).json({ success: false, error: "An account with this email already exists." });
      }
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

router.post("/loginuser",
    [
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req , res)=> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try{
            let userData = await User.findOne({email});
            if(!userData){
                return res.status(400).json({ error: "Invalid credentials"});
            }
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if(!pwdCompare){
                return res.status(400).json({ error: "Invalid credentials"});
            }
            const data = {
              user : {
                id:userData.id
              }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            return res.json({success:true, authToken:authToken})
        }
        catch (error){
            console.log(error);
            res.json({success:false})
        }
})

module.exports = router;