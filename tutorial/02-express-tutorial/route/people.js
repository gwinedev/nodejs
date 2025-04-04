const express = require('express')
const router = express.Router()
const { createPerson, updatePerson, getPeople, deletePerson, createPersonPostman } = require('../controllers/people')

// setting up the routes

// router.get('/', getPeople)
// router.post('/', createPerson)
// router.post('/postman', createPersonPostman)
// router.put('/:id', updatePerson)
// router.delete('/:id', deletePerson)


router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson)
router.route('/:id').delete(deletePerson)

module.exports = router
