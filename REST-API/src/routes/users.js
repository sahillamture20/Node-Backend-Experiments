const express = require('express')
const router = express.Router()

const {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/users.js') 

// GET /users (READ)
router.get('/users', getUsers)

// POST /users (CREATE)
router.post('/users', createUser)

// Patch /users/:id (findByIdAndUpdate)
router.patch('/users/:id', updateUser)

// Delete /user/:id (findByIdAndDelete)
router.delete('/users/:id', deleteUser)

module.exports = router;