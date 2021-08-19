const GROUPS = `
    SELECT 
        group_name,
        group_id
    FROM groups
    OFFSET $1 FETCH FIRST $2 ROWS ONLY
`;

const COUNT_GROUPS = `
    SELECT 
        COUNT(group_id)
    FROM groups
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