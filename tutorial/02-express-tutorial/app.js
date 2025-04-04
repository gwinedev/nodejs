const express = require('express')
const app = express()

const peopleRouter = require('./route/people')
const loginRouter = require('./route/auth')
// static assets
app.use(express.static('./methods-public'))

// parse form data
app.use(express.urlencoded({ extended: false }))

// parse json
app.use(express.json())
// people Router
app.use('/api/people', peopleRouter)
app.use('/login', loginRouter)

app.listen(5000, () => {
    console.log('Listen in on port 5000');

})