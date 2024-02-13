const router = require('express').router()

const { User } = require('../../models')

router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body)

        res.json(user)

    } catch (err) {
        console.log(err)
    }
})