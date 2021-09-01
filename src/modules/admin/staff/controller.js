const model = require('./model.js')
const htmlController = require("../../../lib/htmlController");
const GET = async (req, res) => {
	res.render(
		...htmlController(
            req.userInfo, 
            await model.teachers(req.query, req.userInfo),
            { header: "private/header.html"}
		)
	)
}

const ASSISTANT_GET = async (req, res) => {
	res.render(
		...htmlController(
            req.userInfo, 
            await model.assistants(req.query, req.userInfo),
            { header: "private/header.html"}
		)
	)
}

const ASSISTANT_DELETE = async (req, res) => {
     let deleted = await model.remove_assistant(req.body, req.userInfo);
	 if(deleted) {
		res.status(200).json({ status: 204, message: "The assistant  deleted!"})
	 } else {
		res.status(400).json({ status: 400, message: "Something went wrong!"})
	}
}

const TEACHER_DELETE = async (req, res) => {
	let deleted = await model.remove_teacher(req.body, req.userInfo);
	if(deleted) {
	   res.status(200).json({ status: 204, message: "The assistant  deleted!"})
	} else {
	   res.status(400).json({ status: 400, message: "Something went wrong!"})
   }
}

const UPDATE_TEACHER = async (req, res) => {
	let update = await model.update_teacher(req.body, req.userInfo) || {};
	if(update.isTrue) {
		res.status(200).json(update)
	} else {
		res.status(400).json(update)
	}
};

const UPDATE_ASSISTANT = async (req, res) => {
	let update = await model.update_assistant(req.body, req.userInfo) || {};
	if(update.isTrue) {
		res.status(200).json(update)
	} else {
		res.status(400).json(update)
	}
};

module.exports = {
	GET, ASSISTANT_GET, ASSISTANT_DELETE, TEACHER_DELETE, UPDATE_TEACHER, UPDATE_ASSISTANT
};