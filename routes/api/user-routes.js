const router = require('express').Router()

const {
    getAllUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, removeFriend
} = require('../../controllers/userControl')

router.route('/').get(getAllUsers).post(createUser)

module.exports = router