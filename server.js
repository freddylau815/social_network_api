const express = require('express')
const app = express()

const PORT = 3333

const connection = require('./config/connection')

// Routes
const { user_routes, thought_routes } = require('./routes/api')
// const user_routes = require('./routes/api/user_routes')
// const thought_routes = require

// Middleware
app.use(express.json())

// Load routes
app.use('/api', [user_routes, thought_routes])

connection.on('open', () => {
    app.listen(PORT, () => console.log('Server started on port', PORT))
})