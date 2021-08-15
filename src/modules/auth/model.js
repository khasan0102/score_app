const { fetch, fetchAll } = require('../../lib/postgres.js')
const { VALIDATE } = require('./query.js')


const validate = async ({ role, username, password }) => {
	let user = await fetch(VALIDATE, username, password,
		role == 1 ? '{ 4 }' :
		role == 2 ? '{ 2, 3 }' :
		role == 3 ? '{ 1 }' : '{ 0 }'
		)
	
	return user
}



module.exports = {
	validate
}