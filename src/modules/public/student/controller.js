const model = require('./model.js')
const htmlController = require("../../../lib/htmlController");

const STUDENTS = async (req, res) => {
	res.render(
		...htmlController(req.userInfo, await model.students(req.query, req.userInfo))
	);
}

const STUDENT = async (req, res) => {
	res.render(
		...htmlController(req.userInfo, await model.studentScore(req.params, req.userInfo))
	);
}

const SEARCH = async (req, res) => {
	res.render(
		...htmlController(req.userInfo, await model.search(req.query, req.userInfo))
	);
}

module.exports = {
	STUDENTS,
	STUDENT,
	SEARCH
}