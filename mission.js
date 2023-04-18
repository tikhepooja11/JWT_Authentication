const express = require('express');
const Model = require('../models/mission');
const auth = require('../middleware/auth');

const router = express.Router()

// Get all Missions
router.get('/getAll',auth, async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get all Missions for a site
router.get('/getAllForSite',auth, async (req, res) => {
    try{
        const data = await Model.find({siteId:req.body.siteId});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Get all Missions for a category
router.get('/getAllForCategory',auth, async (req, res) => {
    try{
        const data = await Model.find({category:req.body.category});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


// Create Mission
router.post('/create',auth, async(req, res) => {
    const data = new Model({
        alt: req.body.alt,
        speed: req.body.speed,
        name: req.body.name,
        waypoints: req.body.waypoints,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        siteId: req.body.siteId,
        category: req.body.category,
        createdBy: req.body.createdBy,
        isRunnable: false
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Delete Mission
router.delete('/delete/:id',auth, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Mission with name ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update Mission
router.patch('/update/:id',auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = {
            alt: req.body.alt,
            speed: req.body.speed,
            name: req.body.name,
            waypoints: req.body.waypoints,
            updatedAt: Date.now(),
            siteId: req.body.siteId,
            category: req.body.category,
            createdBy: req.body.createdBy,
            isRunnable: false
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