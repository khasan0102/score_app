const { fetch, fetchAll } = require('../../lib/postgres.js')
const { GROUPS } = require('./query.js')


const Groups = async ({ studentId = 0, assistantId = 0 }, {groups: userGroups, role}) => {
	let groups = await fetchAll(GROUPS, studentId, assistantId, userGroups.length ? userGroups : [0])
	let table = {
		'group name': groups.map( group => ({ type: 'link', text: group.group_name, link: '/students?groupId=' + group.group_id }) ),
		'teacher': groups.map( group => ({ type: role == 'student' ? 'text' : "link", text: group.teacher_full_name, link: '/students?teacherId=' + group.teacher_id }) ),
		'student count': groups.map( group => ({ type: 'text', text: group.student_count }) ),
		'assistants': groups.map( group => ({ type: 'link', text: 'assistants: ' + group.assistant_count, link: '/assistants?groupId=' + group.group_id }) ),
	}


	return {
		html: 'public/table.html',
		tableName1: 'Groups: ' + groups.length,
		tableName2: studentId ? 'Student: ' + groups[0].student_full_name : assistantId ? 'Assistant: ' + groups[0].assistant_full_name : '',
		table
	}
}


module.exports = {
	Groups 
}