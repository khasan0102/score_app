const { fetch, fetchAll } = require('../../../lib/postgres.js');

const { COUNT_STUDENTS, STUDENTS, COUNT_SCORES, STUDENT_SCORES } = require('./query.js');

const students = async ({ page = 1, groupId = 0, teacherId = 0 }) => {
    page = +page;
    groupId = !groupId ? 0 : +groupId;  
    let { count } = await fetch(COUNT_STUDENTS, groupId, teacherId);
    let limit = 6;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
    let teacherPath = `teacherId=${teacherId}`;
    let groupPath = `groupId=${groupId}`
	let students = await fetchAll( STUDENTS, groupId, +teacherId, (page - 1) * limit, limit );
    let path = '/students?' + (groupId  && teacherId ? `${groupPath}` : teacherId ? `${teacherPath}` : groupId ? `${groupPath}` : '');
    let table = {
        username : students.map(el => ({text: el.full_name, link: `/admin/students/${el.group_id}/${el.student_id}`, type: groupId > 0 ? 'link' : 'text', id: el.student_id})),
        phoneNumber: students.map(el => ({text: el.phone_number, link: `tel:+${el.phone_number}`, type: 'link'})),
    }   
    return {
        html: 'private/admin.html',
        panel: 'table-users.html',
        data: {
            table,
            pages,
            page,
            path,
            heading: groupId ? students[0].group_name : 'Students'
        }
    }
}

const scores = async ({ groupId, studentId }, { page = 0 }) => {
    page = +page;
    groupId = !groupId ? 0 : +groupId;  
    let { count } = await fetch(COUNT_SCORES, groupId, studentId);
    let limit = 2;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
	let scores = await fetchAll( STUDENT_SCORES, groupId, studentId, (page - 1) * limit, limit );
    let path = `/students/${groupId}/${studentId}?` 
    let table = {
        scoreValue : scores.map(el => ({text: el.score_value, type:'text', id: el.score_id})),
        description: scores.map(el => ({text: el.score_desc,  type: 'text'})),
        time: scores.map(el => ({text: el.score_created_at, type:'text'}))
    }   
    return {
        html: 'private/admin.html',
        panel: 'table-users.html',
        data: {
            table,
            pages,
            page,
            path,
            heading: scores[0].full_name
        }
    }
}

module.exports = {
	students, scores
} 