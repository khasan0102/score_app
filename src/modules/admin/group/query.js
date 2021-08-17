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
`

module.exports = {
    GROUPS, COUNT_GROUPS
}