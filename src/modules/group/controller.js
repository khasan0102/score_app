const model = require('./model.js')
const htmlController = require("../../lib/htmlController")
const GET = async (req, res) => { 
	res.render(
		...htmlController(req.userInfo, await model.Groups(req.query, req.userInfo)
		)
	)
}

module.exports = {
	GET
}
