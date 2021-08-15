const { fetchAll } = require('../../lib/postgres.js')
const { TEACHERS, ASSISTANTS } = require('./query.js')



const teachers = async ({ groups, role }) => {
	let teachers = await fetchAll(TEACHERS, groups);
	let table = {
		'full name': teachers.map(teacher => ({ type: role == 'student' ? 'text' : "link", text: teacher.teacher_full_name, link: '/students?teacherId=' + teacher.teacher_id })),
		'age': teachers.map(teacher => ({ type: 'text', text: teacher.teacher_age })),
		'contact': teachers.map(teacher => ({ type: 'link', text: '+' + teacher.teacher_contact, link: 'tel:+' + teacher.teacher_contact })),
	};
    
	return {
		tableName1: 'Teachers: ' + teachers.length,
		tableName2: '',
		table
	}
}

const assistants = async ({ groupId = 0 }, { groups }) => {
	let assistants = await fetchAll(ASSISTANTS,
		groups.includes(+groupId) ? groupId : 0,
		groups
	);

	let table = {
		'full name': assistants.map(assistant => ({ type: 'text', text: assistant.assistant_full_name })),
		'age': assistants.map(assistant => ({ type: 'text', text: assistant.assistant_age })),
		'contact': assistants.map(assistant => ({ type: 'link', text: '+' + assistant.assistant_contact, link: 'tel:+' + assistant.teacher_contact })),
		'groups': assistants.map(assistant => ({ type: 'link', text: 'groups: ' + assistant.group_count, link: '/groups?assistantId=' + assistant.assistant_id })),
	};

	return {
		tableName1: 'Assistants: ' + assistants.length,
		tableName2: '',
		table
	};
}


module.exports = {
	assistants,
	teachers,
}