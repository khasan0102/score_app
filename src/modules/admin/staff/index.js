const router = require('express').Router()
const { GET, ASSISTANT_GET, ASSISTANT_DELETE, TEACHER_DELETE } = require('./controller.js')
const studentMiddleware = require("../../../middlewares/studentMiddleware")
const deleteMiddleware = require("../../../middlewares/deleteMiddleware");
router.use( studentMiddleware );

router.route('/admin/teachers')
	.get( GET )
	.delete( deleteMiddleware, TEACHER_DELETE )

router.route('/admin/assistants')
	.get( ASSISTANT_GET )
	.delete(deleteMiddleware, ASSISTANT_DELETE )



module.exports = router