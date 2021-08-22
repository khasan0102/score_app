const { fetch, fetchAll } = require('../../../lib/postgres.js');

const { TEACHERS_COUNT, TEACHERS, ASSISTANT_COUNT, ASSISTANTS} = require('./query.js');

const teachers = async ({ page = 1 }) => {
    page = +page
    let { count } = await fetch(TEACHERS_COUNT);
    let limit = 2;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
	let teachers = await fetchAll( TEACHERS, (page - 1) * limit, limit );
    let table = {
        username : teachers.map(el => ({text: el.full_name, link: `/admin/students?teacherId=${el.teacher_id}`, type: 'link', id: el.teacher_id})),
        phoneNumber: teachers.map(el => ({text: el.phone_number, link: `tel:+${el.phone_number}`, type: 'link'})),
    }
    return {
        html: 'private/admin.html',
        panel: 'table-users.html',
        data: {
            table,
            pages,
            page,
            path: '/teachers?',
            heading: "Teachers"
        }
    }
}


const assistants = async ({ page = 1, groupId = 0 }) => {
    page = +page
    let { count } = await fetch(ASSISTANT_COUNT, groupId);
    let limit = 2;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
	let assistants = await fetchAll( ASSISTANTS, groupId, (page - 1) * limit, limit );
    let table = {
        username : assistants.map(el => ({text: el.full_name, link: `/students?teacherId=${el.assistant_id}`, type: 'text', id: el.assistant_id})),
        phoneNumber: assistants.map(el => ({text: el.phone_number, link: `tel:+${el.phone_number}`, type: 'link'})),
    }
    return {
        html: 'private/admin.html',
        panel: 'table-users.html',
        data: {
            table,
            pages,
            page,
            path: '/assistants?',
            heading: groupId ? assistants[0].group_name + "'s Asistants" : 'Assistants'
        }
    }
}


module.exports = {
	teachers, assistants
} 