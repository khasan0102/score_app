const { fetch, fetchAll } = require('../../../lib/postgres.js');

const { COUNT_STUDENTS, STUDENTS} = require('./query.js');

const students = async ({ page = 1, groupId = 0, teacherId = 0 }) => {
    page = +page
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
        username : students.map(el => ({text: el.full_name, link: `/students/${el.groupId}/${el.student_id}`, type: 'link', id: el.student_id})),
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


const remove = async ({ groupId }) => {
    return await fetch(DELETE_GROUP, groupId);
}

module.exports = {
	students
} 