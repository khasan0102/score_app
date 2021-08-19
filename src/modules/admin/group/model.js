const { fetch, fetchAll } = require('../../../lib/postgres.js');

const { GROUPS, COUNT_GROUPS } = require('./query.js');

const groups = async ({ page = 1 }) => {
    page = +page
    let { count } = await fetch(COUNT_GROUPS);
    let limit = 1;
    let pages = Math.ceil(count / limit);
    if(page > pages) page = pages;
    if(page < 1) page = 1;
	let groups = await fetchAll(GROUPS, (page - 1) * limit, limit);
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

module.exports = {
	groups 
} 