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
        User.findOne({
            _id: req.params.userId
        })
        .select('__v')
        // populate functions can be added here
        .then((data) => {
            if (!data) {
                return res.status(404).json({
                    message: "This ID doesn't have a user associated."
                })
            }
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
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
        User.findOneAndUpdate(
            {
                _id: req.params.userId
            },
            {
                $set: req.body
            },
            {
                new: true,
                runValidators: true
            }
        )
        .then((data) => {
            if(!data) {
                return res.status(404).json({ message: "This ID doesn't have a user associated." })
            }
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId }   
        )
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "This ID doesn't have a user associated." })
            }
        })
        .then(() => {
            res.json({ message: "This user has been deleted. "})
        })
        .catch((err) => {
            console.log(err)
            res.json(500).json(err)
        })
    },

    addFriend(req, res) {
    },

    removeFriend(req, res) {
    },


}

module.exports = userController
