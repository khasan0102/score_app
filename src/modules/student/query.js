const STUDENTS = `
	SELECT 
		s.student_id,
		g.group_id,
		u.user_first_name || ' ' || u.user_last_name AS student_full_name,
		u.user_contact AS student_contact,
		u.user_age AS student_age,
		g.group_name,
		CASE
			WHEN u.user_gender = 1 THEN 'erkak'
			ELSE 'ayol'
		END AS student_gender,
		( SELECT 
				SUM(score_value) 
			FROM scores 
			WHERE student_id = s.student_id AND group_id = $1
		) AS student_score,
		( SELECT 
				user_first_name || ' ' || user_last_name 
			FROM users 
			WHERE t.user_id = user_id
		) AS teacher_name
	FROM users u
	RIGHT JOIN students s ON s.user_id = u.user_id
	RIGHT JOIN group_students gs ON gs.student_id = s.student_id
	RIGHT JOIN groups g ON g.group_id = gs.group_id
	RIGHT JOIN teachers t ON t.teacher_id = g.teacher_id
	WHERE u.user_role = 4 AND g.group_id = ANY($3)  
	AND
	CASE
		WHEN $1 > 0 THEN g.group_id = $1
		ELSE g.group_id = $1
	END OR 
	CASE
		WHEN $2 > 0 THEN t.teacher_id = $2
		ELSE false
	END
	ORDER BY student_score DESC
`;

const STUDENT_SCORE = `
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
	WHERE s.student_id = $1 AND g.group_id = ANY($3) AND
	s.group_id = $2
	ORDER BY s.score_value
`;

const STUDENT_SEARCH = `
	SELECT DISTICT ON(student_id)
		s.student_id,
		u.user_first_name || ' ' || u.user_last_name AS student_full_name,
		u.user_age AS student_age,
		u.user_contact AS student_contact,
		( SELECT 
				SUM(score_value) 
			FROM scores 
			WHERE student_id = s.student_id
		) AS student_score
	FROM students s
	INNER JOIN users u USING(user_id)
	INNER JOIN group_students gs ON gs.student_id = s.student_id
	WHERE gs.group_id = ANY($2) AND
	u.user_first_name || ' ' || u.user_last_name ILIKE $1 OR
	u.user_contact ILIKE $1
	ORDER BY s.student_id
` 

module.exports = {
	STUDENT_SEARCH,
	STUDENT_SCORE,
	STUDENTS
}