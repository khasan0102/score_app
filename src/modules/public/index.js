const homeRouter = require('./home')
const authRouter = require('./auth')
const groupRouter = require('./group')
const studentRouter = require('./student')
const staffRouter = require('./staff')

module.exports = [
	authRouter,
	homeRouter,
	studentRouter,
	groupRouter,
	staffRouter,
]