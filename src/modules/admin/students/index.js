const router = require('express').Router();
const { GET, DELETE, SCORE_GET } = require('./controller.js');
const studentMiddleware = require("../../../middlewares/studentMiddleware");
router.use( studentMiddleware );

router.route('/admin/students')
	.get( GET )
	.delete( DELETE )

router.route('/admin/students/:groupId/:studentId')
	.get( SCORE_GET )
	.delete( DELETE )
	
module.exports = router