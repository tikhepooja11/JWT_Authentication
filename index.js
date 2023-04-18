require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const droneRoute = require('./routes/drones');
const missionRoute = require('./routes/mission');
const userRoute = require('./routes/user');
const siteRoute = require('./routes/site');
const categoryRoute = require('./routes/category');


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());

app.use('/drone', droneRoute);
app.use('/mission', missionRoute);
app.use('/user', userRoute);
app.use('/site', siteRoute);
app.use('/category', categoryRoute);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})