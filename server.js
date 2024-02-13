const express = require('express')
const app = express()

const PORT = 3003

// Routes
const { user_routes, thought_routes } = require('./routes/api')

// Middleware
app.use(express.json())

// Load routes
app.use('./api', [user_routes, thought_routes])

connection.on('open', () => {
    app.listen(PORT, () => console.log('Server started on port', PORT))
})