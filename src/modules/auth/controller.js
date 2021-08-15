const model = require('./model.js')
const { sign } = require('../../lib/jwt.js')
const htmlController = require("../../lib/htmlController.js");

const GET = (req, res) => {
	res.render(...htmlController(
		req.userInfo, {html: "public/login.html"}
	))
}



const POST = async (req, res) => {
	let user = await model.validate( req.body )
	if(user) {
		res.cookie('token', sign(user), { maxAge: 100000 })
		   .redirect('/groups')
	} else {
		res.render(...htmlController(
			req.userInfo, {html: "public/login.html", errorMessage: "Wrong password or username"}
		))
	}
}

const LOGOUT = async (req, res) => {
	res.clearCookie('token').redirect('/');
}

module.exports = {	
	POST,
	GET,
	LOGOUT
}