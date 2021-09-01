const { fetch, fetchAll } = require('../../../lib/postgres.js');
const { userUpdateValidation } = require("../../../validations")
const { TEACHERS_COUNT, TEACHERS, ASSISTANT_COUNT, ASSISTANTS, DELETE_ASSISTANT, DELETE_TEACHER, UPDATE_TEACHER, UPDATE_ASSISTANT } = require('./query.js');

const teachers = async ({ page = 1 }, { groups }) => {
    page = +page
    let { count } = await fetch(TEACHERS_COUNT, groups);
    let limit = 2;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
	let teachers = await fetchAll( TEACHERS, groups, (page - 1) * limit, limit );
    let table = {
        fullName : teachers.map(el => ({text: el.full_name, link: `/admin/students?teacherId=${el.teacher_id}`, type: 'link', id: el.teacher_id})),
        phone: teachers.map(el => ({text: el.phone_number, link: `tel:+${el.phone_number}`, type: 'link'})),
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
        fullName : assistants.map(el => ({text: el.full_name, link: `/students?teacherId=${el.assistant_id}`, type: 'text', id: el.assistant_id})),
        phone: assistants.map(el => ({text: el.phone_number, link: `tel:+${el.phone_number}`, type: 'link'})),
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



const update = async (body, query) => {
    try {
        let { fullName, phone, id } = body; 
        let obj = await userUpdateValidation.validateAsync({fullName, phone: +phone, id});
        let words = fullName.split(' ');
        let word = words[2] || '';
        if(word.length) 
        throw 'Full name entered incorrectly';
        let updated = await fetch(query, words[0], words[1], phone, id);
        
        if(!updated)
        throw 'Update error';
        
        return {
            isTrue: true,
            status: 201,
            message: 'User successfully updated!'
        }
        
    } catch (e) {
        if(typeof e === 'object')
        e = e.message
        return {
            status: 400,
            isTrue: false,
            message: e
        }
    }
};

const remove_assistant = async ( {assistantId = 0}) => {
    return await fetch(DELETE_ASSISTANT, assistantId);
}

const remove_teacher = async ( {teacherId = 0}) => {
    return await fetch(DELETE_TEACHER, teacherId);
}

const update_teacher = (body) => {
    return update(body, UPDATE_TEACHER);
}

const update_assistant = (body) => {
    return update(body, UPDATE_ASSISTANT);
}

module.exports = {
	teachers, assistants, remove_assistant, remove_teacher, update_teacher, update_assistant
} 