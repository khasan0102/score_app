const router = require('express').Router()
const { GET, ASSISTANT_GET } = require('./controller.js')

router.route('/admin/teachers')
	.get( GET )

router.route('/admin/assistants')
	.get( ASSISTANT_GET )



module.exports = router