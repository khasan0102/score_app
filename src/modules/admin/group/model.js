const { fetch, fetchAll } = require('../../../lib/postgres.js');

const { GROUPS, COUNT_GROUPS, DELETE_GROUP } = require('./query.js');

const groups = async ({ page = 1 }, {groups: userGroups, role}) => {
    page = +page
    let { count } = await fetch(COUNT_GROUPS, userGroups.length ? userGroups : [0]);
    let limit = 6;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
	let groups = await fetchAll(GROUPS, userGroups.length ? userGroups : [0], (page - 1) * limit, limit);
    return {
        html: 'private/admin.html',
        panel: 'table-groups.html',
        data: {
            groups,
            pages,
            page
        }
    }
}


const remove = async ({ groupId }) => {
    return await fetch(DELETE_GROUP, groupId);
}

const update = async ({ groupId, groupName}) => {
    console.log(groupid, groupName);
}

module.exports = {
	groups, remove, update
} 