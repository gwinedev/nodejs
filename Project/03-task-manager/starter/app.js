const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('./db/connect')
require('dotenv').config()


// middleware
app.use(express.json())
app.use(express.static('./public'))

// routes
app.use('/api/v1/tasks', tasks)

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, console.log(`Server is listening on port ${port}`))

    } catch (err) {
        console.log(err);

    }
}

start()
