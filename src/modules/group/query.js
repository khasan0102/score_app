const GROUPS = `
	SELECT DISTINCT ON(g.group_id) 
		g.group_id,
		g.group_name,
		u.user_first_name || ' ' || u.user_last_name AS teacher_full_name,
		t.teacher_id,
		su.user_first_name || ' ' || su.user_last_name AS student_full_name,
		au.user_first_name || ' ' || au.user_last_name AS assistant_full_name,
		( SELECT 
				COUNT(student_id) 
			FROM group_students 
			WHERE group_id = g.group_id
		) AS student_count,
		( SELECT 
				COUNT(assistant_id) 
			FROM group_assistants 
			WHERE group_id = g.group_id
		) AS assistant_count
	FROM groups g
	INNER JOIN group_students gs ON gs.group_id = g.group_id
	INNER JOIN students s ON s.student_id = gs.student_id
	INNER JOIN users su ON su.user_id = s.user_id
	INNER JOIN group_assistants ga ON ga.group_id = g.group_id
	INNER JOIN assistants a ON a.assistant_id = ga.assistant_id
	INNER JOIN users au ON au.user_id = a.user_id
	INNER JOIN teachers t ON t.teacher_id = g.teacher_id
	INNER JOIN users u ON u.user_id = t.user_id
	WHERE g.group_id = ANY($3) AND
	CASE
		WHEN $1 > 0 THEN s.student_id = $1
		ELSE true
	END AND
	CASE
		WHEN $2 > 0 THEN ga.assistant_id = $2
		ELSE true
	END 
	ORDER BY g.group_id
`

module.exports = {
	GROUPS
}