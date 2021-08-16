const htmlController = require("../../../lib/htmlController");


const GET = async (req, res) => {
	res.render(
		...htmlController(req.userInfo, { html: 'public/home.html'}
		)
	)
}

module.exports = {
	GET
}