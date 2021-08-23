const router = require('express').Router()
const { GET, DELETE } = require('./controller.js')
const studentMiddleware = require("../../../middlewares/studentMiddleware")
router.use( studentMiddleware );
router.route('/admin/groups')
	.get( GET )
	.delete( DELETE )


module.exports = router