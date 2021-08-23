const { fetchAll } = require('../../../lib/postgres.js');
const { STUDENTS, STUDENT_SCORE, STUDENT_SEARCH } = require('./query.js');

const students = async ({ groupId = 0, teacherId = 0 }, { groups, role }) => {
	let students = await fetchAll(STUDENTS, 
		groups.includes(+groupId) ? groupId : 0, 
		teacherId,
		groups);
		
	let table = {
		'full name': students.map( student => ({ type: 'link', text: student.student_full_name, link: '/students/' + student.student_id + '/' + student.group_id }) ),
		'age': students.map( student => ({ type: 'text', text: student.student_age } ) ),
		'contact': students.map( student => ({ type: 'link', text: '+' + student.student_contact, link: 'tel:+' + student.student_contact } ) ),
		'groups': students.map( student => ({ type: 'link', text: 'groups', link: '/groups?studentId=' + student.student_id } ) ),
		'total score': students.map( student => ({ type: 'text', text: student.student_score } ) ),
	};

	if(!groupId) delete table['total score']
	if(teacherId) table['full name'] = students.map( student => ({ type: 'text', text: student.student_full_name }) )
    if(role == 'student') delete table['contact'];
	return {
		tableName2: groupId  && students.length ? 'Group: ' + students[0].group_name : teacherId  && students.length ? 'Teacher: ' + students[0].teacher_name : 'Students: 0',
		tableName1: 'Students: ' + students.length,
		table
	};
};

const studentScore = async ({ studentId, groupId = 0 },  { groups }) => {
	let scores = await fetchAll(STUDENT_SCORE, 
		studentId, 
		groups.includes(+groupId) ? groupId : 0,
		groups);
	let table = {
		'score': scores.map( score => ({ type: 'text', text: score.score_value }) ),
		'date': scores.map( score => ({ type: 'text', text: score.score_created_at } ) ),
		'description': scores.map( score => ({ type: 'text', text: score.score_desc } ) ),
	}
	return {
		tableName1: 'Student: ' + scores[0].student_full_name,
		tableName2: 'Group: ' + scores[0].group_name,
		table
	}
};


const search = async ({ studentSearch }, { groups }) => {
	const students = await fetchAll(STUDENT_SEARCH, '%' + studentSearch + '%', groups)
	let table = {
		'full name': students.map( student => ({ type: 'text', text: student.student_full_name }) ),
		'age': students.map( student => ({ type: 'text', text: student.student_age } ) ),
		'contact': students.map( student => ({ type: 'link', text: '+' + student.student_contact, link: 'tel:+' + student.student_contact } ) ),
		'groups': students.map( student => ({ type: 'link', text: 'groups', link: '/groups?studentId=' + student.student_id } ) ),
	}

	return {
		tableName1: 'Result: ' + students.length,
		tableName2: '',
		table
	}
};


module.exports = {
	studentScore,
	students,
	search
};