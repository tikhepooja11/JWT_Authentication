const express = require('express');
const Model = require('../models/drone');
const auth = require('../middleware/auth');
const category = require('../models/category');

const router = express.Router()

// Get all Drones
router.get('/getAll',auth, async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get all Drones for a site
router.get('/getAllForSite',auth, async (req, res) => {
    try{
        const data = await Model.find({siteId:req.body.siteId});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get all Drones for a category
router.get('/getAllForSite',auth, async (req, res) => {
    try{
        const data = await Model.find({category:req.body.category});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Create Drone
router.post('/create',auth, async(req, res) => {
    const data = new Model({
        createdAt: Date.now(),
        droneType: req.body.droneType,
        makeName: req.body.makeName,
        name: req.body.name,
        updatedAt: Date.now(),
        createdBy: req.body.createdBy,
        siteId: req.body.siteId,
        category: req.body.category
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Delete Drone
router.delete('/delete/:id',auth, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Drone with name ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update Drone
router.patch('/update/:id',auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = {
            droneType: req.body.droneType,
            makeName: req.body.makeName,
            name: req.body.name,
            updatedAt: Date.now(),
            siteId: req.body.siteId,
            category: req.body.category
        };
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;