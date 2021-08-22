const model = require('./model.js')
const htmlController = require("../../../lib/htmlController");
const GET = async (req, res) => {
	res.render(
		...htmlController(
            req.userInfo, 
            await model.students(req.query, req.userInfo),
            { header: "private/header.html"}
		)
	)
}

const DELETE = async (req, res) => {
     let deleted = await model.remove(req.body, req.userInfo);
	 if(deleted) {
		res.status(200).json({ status: 204, message: "The group deleted!"})
	 } else {
		res.status(400).json({ status: 400, message: "Something went wrong!"})
	}
}

const SCORE_GET = async (req, res) => {
	res.render(
		...htmlController(
            req.userInfo, 
            await model.scores(req.params, req.query),
            { header: "private/header.html"}
		)
	)
}

module.exports = {
	GET, DELETE, SCORE_GET
}