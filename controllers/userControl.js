// importing models
const { User } = require('../models')

// defining functions in this constant for users
const userFunctions = {
    getAllUsers(req, res) {
        User.find()
        .select('-__v')
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    getOneUser(req, res) {
    },

    // function create a user
    // takes in a request
    createUser(req, res) {
        // instance of user is created within the req
        User.create(req.body)
        .then((data) => {
            // that data is converted to json
            res.json(data)
        })
        // return any errors
        .catch ((err) => {
        console.log(err)
        res.status(500).json(err)
        })
    },

    updateUser(req, res) {
    },

    deleteUser(req, res) {
    },

    addFriend(req, res) {
    },

    removeFriend(req, res) {
    },


}

module.exports = userController
