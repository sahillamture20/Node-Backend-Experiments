const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const userRoutes = require('./src/routes/users.js')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRoutes)

app.get("/", (req, res) => {
  // Here '/' is home directory & we're using http method 'get'
  res.send("Hello World!!!");
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
/*
Complete code in One file [Server + DB] =>
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const User = mongoose.model('User', { //User become users in the mongodb [becomes pural form of modal name]
    name: String,
    email: String,
    password: String,
    phone: Number,
    isMinor: Boolean
})

app.get('/', (req, res) => { // Here '/' is home directory & we're using http method 'get'
    res.send("Hello World!!!");
})


// GET /users (READ)
app.get('/users', async (req, res) => { 
    try {
        const users = await User.find();
        res.json({
            status: 'Success',
            data: users
        })
    } catch (error) {
        res.status(500).json({ 
            status: 'Failed',
            message: error.message   //Here, you can pass any error msg if want
        })
    }
})

// POST /users (CREATE)
app.post('/users', async (req, res) => {
    try {
        const {name, email, password, phone, isMinor} = req.body;
        await User.create({name, email, password, phone, isMinor});
        res.json({
            status: 'Success',
            message: 'User created successfully'
        })
    } catch (error) {
        res.status(500).json({ 
            status: 'Failed',
            message: error.message   //Here, you can pass any error msg if want
        })
    }
})

// Patch /users/:id (findByIdAndUpdate)
app.patch('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, password, phone, isMinor} = req.body;
        await User.findByIdAndUpdate(id, {name, email, password, phone, isMinor});
        res.json({
            status: 'Success',
            message: 'User created successfully'
        })
    } catch (error) {
        res.status(500).json({ 
            status: 'Failed',
            message: error.message   //Here, you can pass any error msg if want
        })
    }
})

// Delete /user/:id (findByIdAndDelete)
app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params.id;
        await User.findByIdAndDelete(id);
        res.json({
            status: 'Success',
            message: 'User deleted successfully'
        })
    } catch (error) {
        res.status(500).json({ 
            status: 'Failed',
            message: error.message   //Here, you can pass any error msg if want
        })
    }
})

mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("DB connection successful"))
        .catch((err) => console.log(err))


app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
})
*/
