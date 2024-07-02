const User = require('../models/users.js')

const getUsers = async (req, res) => { 
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
}

const createUser = async (req, res) => {
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
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, password, phone, isMinor} = req.body;
        await User.findByIdAndUpdate(id, {name, email, password, phone, isMinor});
        res.json({
            status: 'Success',
            message: 'User updated successfully'
        })
    } catch (error) {
        res.status(500).json({ 
            status: 'Failed',
            message: error.message   //Here, you can pass any error msg if want
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
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
}

module.exports = {getUsers, createUser, updateUser, deleteUser} 