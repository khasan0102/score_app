const router = require('express').Router()
const { TEACHERS, ASSISTANTS } = require('./controller.js')

router.route('/teachers')
	.get( TEACHERS )

router.route('/assistants')
	.get( ASSISTANTS )


module.exports = router