const router = require('express').Router();
const { GET, DELETE, SCORE_GET, DELETE_SCORE, UPDATE } = require('./controller.js');
const studentMiddleware = require("../../../middlewares/studentMiddleware");
const deleteMiddleware = require("../../../middlewares/deleteMiddleware");
router.use( studentMiddleware );

router.route('/admin/students')
	.get( GET )
	.post( UPDATE )
	.delete( deleteMiddleware, DELETE )

router.route('/admin/students/:groupId/:studentId')
	.get( SCORE_GET )
	.delete( DELETE_SCORE )
	
module.exports = router