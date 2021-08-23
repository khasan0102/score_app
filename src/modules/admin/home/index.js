const router = require('express').Router()
const { GET } = require('./controller.js')
const studentMiddleware = require("../../../middlewares/studentMiddleware")
router.use( studentMiddleware );
router.route('/admin')
	.get( GET )


module.exports = router