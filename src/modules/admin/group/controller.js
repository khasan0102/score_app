const model = require('./model.js')
const htmlController = require("../../../lib/htmlController");
const GET = async (req, res) => {
	res.render(
		...htmlController(
            req.userInfo, 
            await model.groups(req.query, req.userInfo),
            { headaer: "private/header.html"}
		)
	)
}

module.exports = {
	GET
}