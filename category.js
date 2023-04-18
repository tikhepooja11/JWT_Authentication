const express = require('express');
const Model = require('../models/category');
const auth = require('../middleware/auth');

const router = express.Router()

// Get all Categories
router.get('/getAll',auth, async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// Create Category
router.post('/create',auth, async(req, res) => {
    const data = new Model({
        name: req.body.name,
        color: req.body.color,
        tagName: req.body.tagName,
        createdAt: Date.now(),
        updatedAt: Date.now()
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Delete Category
router.delete('/delete/:id',auth, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Category with name ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update Category
router.patch('/update/:id',auth, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = {
            name: req.body.name,
            color: req.body.color,
            tagName: req.body.tagName,
            updatedAt: Date.now()
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