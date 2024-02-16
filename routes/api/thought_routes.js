const router = require('express').Router()
const { Thought, User } = require('../../models')

// POST a new thouhgt
router.post('/post-thought', async (req, res) => {
    const { thoughtText, userId} = req.body
    
    try {
        const thought = await Thought.create({
            thoughtText: thoughtText,
            user: userId 
        })

        await User.findByIdAndUpdate(userId, {
            $push: {
                thoughts: thought._id
            }
        })

        res.json(thought)

    } catch (err) {
        console.log(err)
    }
})

// GET a single user by its id and populated thought and friend data
router.get('/user-thoughts', async (req, res) => {
    const thought_id = req.query.thought_id

    try {
        const thought = await Thought.findById(thought_id).populate('user', 'username').select('-__v')

        res.json(thought)

    } catch (err) {
        console.log(err)
    }
})

// GET all users
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find().populate('user', 'username').select('-__v')

        res.json(thoughts)

    } catch (err) {
        console.log(err)
    }
})

// PUT to update user by id
router.put('/thoughts', async (req, res) => {
    const thought_id = req.query.thought_id
    const {thoughtText} = req.body
    try {
        if (thoughtText) {
        const thought = await Thought.findByIdAndUpdate(thought_id, {
            $set: {
                thoughtText: thoughtText
            }
        }, {new: true })

        res.json(thought)
        }

    } catch (err) {
        console.log(err)
    }
})

// DELETE user by id
router.delete('/thoughts', async (req, res) => {
    const thought_id = req.query.thought_id

    try {
        const user = await Thought.findByIdAndDelete(thought_id)

        res.json('Thought has been deleted!')

    } catch (err) {
        console.log(err)
    }
})


// REACTION ROUTES

// POST - add a new reaction to thoughts
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    const thoughtId = req.params.thoughtId

    const reaction = req.body
    try {
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, {
            $push: {
                reactions: reaction,

            }
        }, { new: true })

        res.json(updatedThought)
        

    } catch (err) {
        console.log(err)
    }
})

// DELETE a reaction
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    const thoughtId = req.params.thoughtId
    const reactionId = req.params.reaction_id
    const {reaction} = req.body
    try {
        if (reaction) {
        await Thought.findByIdAndUpdate(thoughtId, {
            $pull: {
                reactions: reactionId
            }
        })

        res.json('Reaction has been deleted')
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router