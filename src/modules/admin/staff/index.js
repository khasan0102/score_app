const router = require('express').Router()
const { GET, ASSISTANT_GET, ASSISTANT_DELETE, TEACHER_DELETE } = require('./controller.js')
const studentMiddleware = require("../../../middlewares/studentMiddleware")
router.use( studentMiddleware );
router.route('/admin/teachers')
	.get( GET )
	.delete( TEACHER_DELETE )

router.route('/admin/assistants')
	.get( ASSISTANT_GET )
	.delete( ASSISTANT_DELETE )



module.exports = router