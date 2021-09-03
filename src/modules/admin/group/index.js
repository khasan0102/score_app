const router = require('express').Router()
const { GET, DELETE, UPDATE } = require('./controller.js')
const studentMiddleware = require("../../../middlewares/studentMiddleware");
const deleteMiddleware = require("../../../middlewares/deleteMiddleware");
router.use( studentMiddleware );
router.route('/admin/groups')
	.get( GET )
	.put( UPDATE )
	.delete(deleteMiddleware, DELETE )


module.exports = router