const { User, Thought } = require('../models')

const thoughtFunctions = {
    getAllThoughts(req, res) {
        Thought.find()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    getOneThought(req, res) {
        Thought.findOne({
            _id: req.params.thoughtId
        })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "This ID doesn't have a thought associated." })
            }
            res.json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((data) => {
            return User.findOneAndUpdate(
                {
                    _id: req.body.userId
                },
                {
                    $push: {
                        thoughts: data._id
                    }
                },
                {
                    new: true
                }
            )
        })
        // return any errors
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "The thought can be created, but there is no user associated with this ID."})
            }
            res.json({ message: "The thought has been added to this user."})
        })
        .catch ((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId
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
            if (!data) {
                return res.status(404).json({ message: "This ID doesn't have a thought associated." })
            }
            res.json(data)
        })
        .catch ((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove(
            {
                _id: req.params.thoughtId
            }
        )
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "This ID doesn't have a thought associated." })
            }

            return User.findOneAndUpdate(
                {
                    thoughts: req.params.thoughtId
                },
                {
                    $pull: {
                        thoughts: req.params.thoughtId
                    }
                },
                {
                    new: true
                }
            )
        })
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: "The thought can be deleted, but there is no user associated with this ID."})
            }
            res.json({ message: "The thought has been deleted."})
        })
        .catch ((err) => {
            console.log(err)
            res.status(500).json(err)
        })

    },

    addReaction(req, res) {

    },

    removeReaction(req, res) {

    },
}

module.exports = thoughtFunctions