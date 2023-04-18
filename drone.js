const mongoose = require('mongoose');
const category = require('./category');

const droneSchema = new mongoose.Schema({
    createdAt: Number,
    deletedBy: mongoose.Schema.Types.ObjectId,
    deletedOn: Date,
    droneType: String,
    makeName: String,
    name: String,
    updatedAt: Number,
    createdBy: mongoose.Schema.Types.ObjectId,
    siteId: mongoose.Schema.Types.ObjectId,
    category: mongoose.Schema.Types.ObjectId
}) 

module.exports = mongoose.model('Drone', droneSchema)