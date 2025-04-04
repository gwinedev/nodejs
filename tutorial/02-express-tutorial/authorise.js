const authorize = (req, res, next) => {
    const {user} = req.query;

    if(user === 'john'){
        req.user = {name: 'john', id: 405}
        next()
    }
    else{
        res.status(404).send('unauthorised')
    }
}

module.exports = authorize