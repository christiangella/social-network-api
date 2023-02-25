// importing models
const { User } = require('../models')

// defining functions in this constant for users
const userFunctions = {
    // function for getting all users
    getAllUsers(req, res) {
        // searches through find method
        User.find()
        // select all instances of id
        .select('-__v')
        // returns data in json format
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    // function for returning a user based on id
    // takes in request and has response
    getOneUser(req, res) {
        // searches through find one method
        User.findOne({
            // specifies based on id
            _id: req.params.userId
        })
        // select instance of id
        .select('__v')
        // get all thoughts
        .populate('thoughts')
        // get all friends
        .populate('friends')
        // returns data in json format
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

    // function updates a user
    // takes in a request and returns response
    updateUser(req, res) {
        // finds a single instance through id to update
        User.findOneAndUpdate(
            {
                _id: req.params.userId
            },
            // set/update what is in the request
            {
                $set: req.body
            },
            // rewrites as new value if it validates
            {
                new: true,
                runValidators: true
            }
        )
        // data is converted to json
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

    // function deletes a user
    // takes in a request and returns response
    deleteUser(req, res) {
        // uses function to search one...
        User.findOneAndDelete(
            // based on id
            { _id: req.params.userId }   
        )
        // returns data as json
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "This ID doesn't have a user associated." })
            }
            res.json({ message: "This user has been deleted. "})
        })
        .catch((err) => {
            console.log(err)
            res.json(500).json(err)
        })
    },

    // function to add friend
    addFriend(req, res) {
        // finds user and calls upon function
        User.findOneAndUpdate(
            // uses id to specifify
            {
                _id: req.params.userId
            },
            // adds friend to set based on request with friendid
            {
                $addToSet: {
                    friends: req.params.friendId
                }
            },
            // new data
            {
                new: true
            }
        )
        // returns data as json
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "This ID doesn't have a user associated." })
            }
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.json(500).json(err)
        })
    },

    // inverse of previous function, adds friend
    removeFriend(req, res) {
        // finds a user...
        User.findOneAndUpdate( 
            {
                // based on id
                id: req.params.userId
            },
            {
                // uses pull function to remove
                $pull: {
                    friends: req.params.friendId
                }
            },
            {
                // new data
                new: true
            }
        )
        // returns data as json
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "This ID doesn't have a user associated." })
            }
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.json(500).json(err)
        })
    },
}

// exports all functions
module.exports = userFunctions
