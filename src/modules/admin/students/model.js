const { fetch, fetchAll } = require('../../../lib/postgres.js');
const { userUpdateValidation } = require("../../../validations")
const { COUNT_STUDENTS, STUDENTS, COUNT_SCORES, STUDENT_SCORES, DELETE_STUDENT, DELETE_SCORE, UPDATE } = require('./query.js');

const students = async ({ page = 1, groupId = 0, teacherId = 0 }, { groups }) => {
    page = +page;
    groupId = !groupId ? 0 : +groupId;  
    let { count } = await fetch(COUNT_STUDENTS, groups.includes(+groupId) ? groupId : 0, teacherId);
    let limit = 6;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
	let students = await fetchAll( STUDENTS, 
        groups.includes(+groupId) ? groupId : 0,
        +teacherId,
        groups,
        (page - 1) * limit, limit 
    );

    let teacherPath = `teacherId=${teacherId}`;
    let groupPath = `groupId=${groupId}`
    let path = '/students?' + (groupId  && teacherId ? `${groupPath}` : teacherId ? `${teacherPath}` : groupId ? `${groupPath}` : '');
    let table = {
        fullName : students.map(el => ({text: el.full_name, link: `/admin/students/${el.group_id}/${el.student_id}`, type: groupId > 0 ? 'link' : 'text', id: el.student_id, groupId: el.group_id})),
        phone: students.map(el => ({text: el.phone_number, link: `tel:+${el.phone_number}`, type: 'link'})),
    }   

    return {
        html: 'private/admin.html',
        panel: 'table-users.html',
        data: {
            table,
            pages,
            page,
            url: '/admin/students',
            path,
            heading: groupId && students.length ? students[0].group_name : 'Students'
        }
    }
}

const scores = async ({ groupId, studentId }, { page = 0 }, { groups }) => {
    page = +page;
    groupId = !groupId ? 0 : +groupId;  
    let { count } = await fetch(COUNT_SCORES, groupId, studentId);
    let limit = 2;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
	let scores = await fetchAll( 
        STUDENT_SCORES, 
        groups.includes(+groupId) ? groupId : 0, 
        studentId, 
        (page - 1) * limit, limit );
    let path = `/students/${groupId}/${studentId}?` 
    let table = {
        scoreValue : scores.map(el => ({text: el.score_value, type:'text', id: el.score_id})),
        description: scores.map(el => ({text: el.score_desc,  type: 'text'})),
        time: scores.map(el => ({text: el.score_created_at, type:'text'}))
    }   
    return {
        html: 'private/admin.html',
        panel: 'table-scores.html',
        data: {
            table,
            pages,
            page,
            path,
            heading: scores.length ? scores[0].full_name : "Scores"
        }
    }
}


const remove_student = async ({ studentId = 0, groupId = 0 }) => {
    return await fetch(DELETE_STUDENT, studentId, groupId)
};

const remove_score = async ({ scoreId = 0}, { groupId = 0, studentId = 0}) => {
    return await fetch(DELETE_SCORE, scoreId, groupId, studentId);
};

const update = async (body) => {
    try {
        let { fullName, phone, id } = body;
        let words = fullName.split(' ');
        let word = words[2] || '';
        if(word.length) 
            throw 'Full name entered incorrectly';
        
        let obj = await userUpdateValidation.validateAsync({fullName, phone: +phone, id});
        let updated = await fetch(UPDATE, words[0], words[1], phone, id);
        if(!updated)
            throw 'Update error';
        return {
            isTrue: true,
            status: 201,
            message: 'Student successfully updated!'
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

module.exports = {
	students, scores, remove_student, remove_score, update
}; 