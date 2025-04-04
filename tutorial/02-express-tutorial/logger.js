const logger = (req, res, next) => {
    const method = req.method
    const time = new Date().getFullYear()
    const url = req.url
    console.log(method, url, time);
    // I can terminate by sending your own response here without send to the app.get
    // If not, it is passed to the next middleware with NEXT
    // res.send('Logger')
    next()
}

module.exports = logger