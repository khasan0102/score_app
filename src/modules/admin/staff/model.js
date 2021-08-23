const { fetch, fetchAll } = require('../../../lib/postgres.js');

const { TEACHERS_COUNT, TEACHERS, ASSISTANT_COUNT, ASSISTANTS, DELETE_ASSISTANT, DELETE_TEACHER } = require('./query.js');

const teachers = async ({ page = 1 }, { groups }) => {
    page = +page
    let { count } = await fetch(TEACHERS_COUNT, groups);
    let limit = 2;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
	let teachers = await fetchAll( TEACHERS, groups, (page - 1) * limit, limit );
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
            url: '/admin/teachers',
            path: '/teachers?',
            heading: "Teachers"
        }
    }
}


const assistants = async ({ page = 1, groupId = 0 }, { groups }) => {
    page = +page
    let { count } = await fetch(ASSISTANT_COUNT, groups.includes(+groupId) ? groupId : 0, groups);
    let limit = 2;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
	let assistants = await fetchAll( ASSISTANTS, 
        groups.includes(+groupId) ? groupId : 0, 
        groups, 
        (page - 1) * limit, limit 
    );

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
            url: '/admin/assistants',
            path: '/assistants?',
            heading: groupId ? assistants[0].group_name + "'s Asistants" : 'Assistants'
        }
    }
}


const remove_assistant = async ( {assistantId = 0}) => {
    return await fetch(DELETE_ASSISTANT, assistantId);
}

const remove_teacher = async ( {teacherId = 0}) => {
    return await fetch(DELETE_TEACHER, teacherId);
}

module.exports = {
	teachers, assistants, remove_assistant, remove_teacher
} 