require("dotenv").config();
const express = require('express');
const Model = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');

const router = express.Router()

// Get all Users
router.get('/getAll', async (req, res) => {
    try{
        const user = await Model.find();
        res.json(user)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Register User
router.post('/register', async(req, res) => {

    const {name,email,password}=req.body

    // Validate User
    if (!(name && email && password)) {
        res.status(400).send("All input is required");
    }

    const oldUser = await Model.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Encrypt Password
    try{
        const encryptedPassword = await bcrypt.hash(password, 10);
    

        const user = new Model({
            name,
            email,
            password:encryptedPassword
        })

        // Create Token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
        );

        user.token = token;

        try {
            const dataToSave = await user.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


// Login User

router.post('/login', async(req, res) => {

    const {email,password}=req.body

    // Validate User
    if (!(email && password)) {
        res.status(400).send("Email and Password required");
    }

    try{

        // Validate if user exist in our database
        const user = await Model.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))){
            
            // Generate Token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );

            user.token = token;
            res.status(200).json(user);
        }
        else{
            res.status(400).send("Invalid Credentials");
        }

        try {
            const dataToSave = await user.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})


module.exports = router;