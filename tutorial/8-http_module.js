const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end('I am using the res.end to fill the request')
    }
    if(req.url === '/about'){
        res.end('This is out history page')
    }
    res.end(`
        <h1>Oops!</h1>
    <p>The page you are looking for does not exist</p>
    <a href="/">Home</a>
    `)
})

server.listen(5000)