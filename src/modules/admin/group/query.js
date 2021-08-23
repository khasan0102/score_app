const GROUPS = `
    SELECT 
        g.group_name,
        g.group_id
    FROM groups g
    WHERE g.group_id = ANY($1)
    OFFSET $2 FETCH FIRST $3 ROWS ONLY
`;

const COUNT_GROUPS = `
    SELECT 
        COUNT(g.group_id)
    FROM groups g
    WHERE g.group_id = ANY($1)
`;
const DELETE_GROUP = `
    DELETE FROM 
        groups
    WHERE 
        group_id = $1
    RETURNING *;
`;

module.exports = {
    GROUPS, COUNT_GROUPS, DELETE_GROUP
};