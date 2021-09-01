const router = require('express').Router()
const { GET, ASSISTANT_GET, ASSISTANT_DELETE, TEACHER_DELETE, UPDATE_TEACHER, UPDATE_ASSISTANT } = require('./controller.js')
const studentMiddleware = require("../../../middlewares/studentMiddleware")
const deleteMiddleware = require("../../../middlewares/deleteMiddleware");
router.use( studentMiddleware );

router.route('/admin/teachers')
	.get( GET )
	.put(UPDATE_TEACHER)
	.delete( deleteMiddleware, TEACHER_DELETE )

router.route('/admin/assistants')
	.get( ASSISTANT_GET )
	.put( UPDATE_ASSISTANT )
	.delete(deleteMiddleware, ASSISTANT_DELETE )



module.exports = router