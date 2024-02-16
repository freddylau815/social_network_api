const router = require('express').Router()
const { User } = require('../../models')

// POST a new user
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body)

        res.json(user)

    } catch (err) {
        console.log(err)
    }
})

// GET a single user by its id and populated thought and friend data
router.get('/user', async (req, res) => {
    const user_id = req.query.user_id

    try {
        const user = await User.findById(user_id).populate('thoughts', 'thoughtText').populate('friends', 'username').select('-__v')
        console.log('User:', user)
        res.json(user)

    } catch (err) {
        console.log(err)
    }
})

// GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().populate('thoughts', 'thoughtText').populate('friends', 'username').select('-__v')

        res.json(users)

    } catch (err) {
        console.log(err)
    }
})

// PUT to update user by id
router.put('/user', async (req, res) => {
    const user_id = req.query.user_id

    const { username, email } = req.body
    try {
        if (username) {
        const user = await User.findByIdAndUpdate(user_id, {
            $set: {
                username: username
            }
        }, {new: true })

        res.json(user)
        }

        if (email) {
            const user = await User.findByIdAndUpdate(user_id, {
                $set: {
                    email: email
                }
            }, {new: true })

            res.json(user)
            }

    } catch (err) {
        console.log(err)
    }
})

// DELETE user by id
router.delete('/user', async (req, res) => {
    const user_id = req.query.user_id

    try {
        const user = await User.findByIdAndDelete(user_id)

        res.json('User has been deleted!')

    } catch (err) {
        console.log(err)
    }
})



// FRIENDS ROUTES

// POST - add a new friend to user's friends
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    const userId = req.params.userId
    const friendId = req.params.friendId
    const {friends} = req.body
    try {

        await User.findByIdAndUpdate(userId, {
            $push: {
                friends: friendId
            }
        })
        const user = await User.findById(userId)
        res.json('Friend Added!')
        
    } catch (err) {
        console.log(err)
    }
})

// DELETE a friend
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    const userId = req.params.userId
    const friendId = req.params.friendId

    const {friends} = req.body
    try {
        if (friends) {
        await User.findByIdAndUpdate(userId, {
            $pull: {
                friends: friendId
            }
        })

        res.json('Friend has been deleted')
        }

    } catch (err) {
        console.log(err)
    }
})

module.exports = router