const { fetch, fetchAll } = require('../../../lib/postgres.js');

const { GROUPS } = require('./query.js')


const groups = async () => {
	let groups = await fetchAll(GROUPS);
    // return groups

    return {
        html: 'private/admin.html',
        panel: 'table-groups.html',
        data: groups
    }
}

module.exports = {
	groups 
}