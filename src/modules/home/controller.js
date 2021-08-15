const htmlController = require("../../lib/htmlController.js")


const GET = async (req, res) => {
	res.render(
		...htmlController(req.userInfo, { html: 'public/home.html'}
		)
	)
}

module.exports = {
	GET
}