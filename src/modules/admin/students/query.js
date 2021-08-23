const COUNT_STUDENTS = `
    SELECT 
        COUNT(t.student_id)
    FROM (
        SELECT DISTINCT ON (s.student_id)
        s.student_id
        FROM students s
        INNER JOIN group_students gs ON gs.student_id = s.student_id
        INNER JOIN groups g ON gs.group_id = g.group_id
        WHERE 
        CASE
            WHEN $1 > 0 THEN gs.group_id = $1
            ELSE true 
        END AND
        CASE
            WHEN $2 > 0 THEN g.teacher_id = $2
            ELSE true 
        END 
        ORDER BY s.student_id
    ) AS t
`;


const STUDENTS = `
    SELECT DISTINCT ON (u.user_id)
        u.user_first_name || ' ' || u.user_last_name as full_name,
        g.group_name,
        g.group_id,
        u.user_contact as phone_number,
        s.student_id
    FROM students s
    INNER JOIN group_students gs ON gs.student_id = s.student_id
    INNER JOIN groups g ON g.group_id = gs.group_id
    INNER JOIN users u ON u.user_id = s.user_id
    WHERE 
    g.group_id = ANY($3) 
    AND
    CASE 
        WHEN $1 > 0 THEN g.group_id = $1
        ELSE true
    END AND
    CASE 
        WHEN $2 > 0 THEN g.teacher_id = $2
        ELSE true
    END
    ORDER BY u.user_id
    OFFSET $4 FETCH FIRST $5 ROWS ONLY;
`;

const COUNT_SCORES = `
    SELECT 
        COUNT(t.score_id)
    FROM (
        SELECT DISTINCT ON (s.score_value)
          s.score_id
        FROM scores s
        INNER JOIN students st ON st.student_id = s.student_id
        INNER JOIN users u ON u.user_id = st.user_id
        LEFT JOIN groups g ON g.group_id = s.group_id
        WHERE s.student_id = $1  AND
        s.group_id = $2
        ORDER BY s.score_value
    ) t
`;


const STUDENT_SCORES = `
    SELECT DISTINCT ON (s.score_value)
        s.score_id,
        s.score_desc,
        s.score_value,
        TO_CHAR(s.score_created_at, 'yyyy-MM-dd HH24:MI:SS') as score_created_at,
        u.user_first_name || ' ' || u.user_last_name AS student_full_name,
        g.group_name
    FROM scores s
    INNER JOIN students st ON st.student_id = s.student_id
    INNER JOIN users u ON u.user_id = st.user_id
    LEFT JOIN groups g ON g.group_id = s.group_id
    WHERE s.student_id = $1 AND 
    s.group_id = $2
    ORDER BY s.score_value
    OFFSET $3 FETCH FIRST $4 ROWS ONLY
`;

module.exports = {
    COUNT_STUDENTS, STUDENTS, COUNT_SCORES, STUDENT_SCORES
};