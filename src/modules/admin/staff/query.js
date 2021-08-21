const TEACHERS_COUNT = `
    SELECT 
        COUNT(teacher_id)
    from teachers;
`;


const TEACHERS = `
    SELECT 
        u.user_first_name || ' ' || u.user_last_name as full_name,
        t.teacher_id,
        u.user_contact as phone_number
    FROM teachers t
    INNER JOIN users u ON u.user_id = t.user_id
    OFFSET $1 FETCH FIRST $2 ROWS ONLY
`;

const ASSISTANT_COUNT = `
    SELECT 
        COUNT(t.assistant_id)
    FROM (
        SELECT DISTINCT ON (a.assistant_id)
            a.assistant_id
        FROM assistants a
        INNER JOIN group_assistants gs ON gs.assistant_id = a.assistant_id
        WHERE 
        CASE 
            WHEN $1 > 0 THEN gs.group_id = $1
            ELSE true   
        END
        ORDER BY a.assistant_id
    ) t
`;

const ASSISTANTS = `
        SELECT DISTINCT ON (a.assistant_id)
            u.user_first_name || ' ' || u.user_last_name AS full_name,
            a.assistant_id,
            u.user_contact AS phone_number,
            g.group_name
        FROM assistants a 
        INNER JOIN users u ON u.user_id = a.user_id
        INNER JOIN group_assistants gs ON gs.assistant_id = a.assistant_id
        INNER JOIN groups g ON g.group_id = gs.group_id
        WHERE 
        CASE 
            WHEN $1 > 0 THEN gs.group_id = $1
            ELSE true   
        END
        ORDER BY a.assistant_id
        OFFSET $2 FETCH FIRST $3 ROWS ONLY
`



module.exports = {
    TEACHERS_COUNT, TEACHERS, ASSISTANT_COUNT, ASSISTANTS
};