const TEACHERS = `
	SELECT DISTINCT ON(t.teacher_id)
		t.teacher_id,
		u.user_first_name || ' ' || u.user_last_name AS teacher_full_name,
		u.user_contact AS teacher_contact,
		u.user_age AS teacher_age,
		CASE
			WHEN u.user_gender = 1 THEN 'erkak'
			ELSE 'ayol'
		END AS teacher_gender
	FROM users u
	RIGHT JOIN teachers t ON t.user_id = u.user_id
	INNER JOIN groups g ON g.teacher_id = t.teacher_id
	WHERE g.group_id = ANY($1)
	ORDER BY t.teacher_id
`;

const ASSISTANTS = `
	SELECT DISTINCT ON(a.assistant_id)
		a.assistant_id,
		u.user_first_name || ' ' || u.user_last_name AS assistant_full_name,
		u.user_contact AS assistant_contact,
		u.user_age AS assistant_age,
		CASE
			WHEN u.user_gender = 1 THEN 'erkak'
			ELSE 'ayol'
		END AS assistant_gender,
		(SELECT
			COUNT(group_id) 
			FROM group_assistants WHERE assistant_id = a.assistant_id
		) AS group_count
	FROM users u
	RIGHT JOIN assistants a ON a.user_id = u.user_id
	INNER JOIN group_assistants ga ON ga.assistant_id = a.assistant_id
	WHERE ga.group_id = ANY($2) AND
	CASE
		WHEN $1 > 0 THEN ga.group_id = $1
		ELSE true
	END
	ORDER BY a.assistant_id
`;

module.exports = {
	ASSISTANTS,
	TEACHERS
}