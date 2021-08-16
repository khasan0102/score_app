const router = require('express').Router()
const { STUDENTS, STUDENT, SEARCH } = require('./controller.js')

router.route('/students')
	.get( STUDENTS )

router.route('/students/:studentId/:groupId')
	.get( STUDENT )

router.route('/students/search')
	.get( SEARCH )

module.exports = router