const htmlController = require("../../../lib/htmlController");


const GET = async (req, res) => {
	res.redirect("/admin/groups")
}

module.exports = {
	GET
}