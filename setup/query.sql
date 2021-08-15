SELECT * FROM users;
SELECT * FROM teachers;
SELECT * FROM assistants;


-- students query
SELECT 
	u.user_first_name || ' ' || u.user_last_name AS student_full_name,
	u.user_contact AS student_contact,
	u.user_age AS student_age,
	CASE
		WHEN u.user_gender = 1 THEN 'erkak'
		ELSE 'ayol'
	END AS student_gender
FROM users u
RIGHT JOIN students s ON s.user_id = u.user_id
WHERE u.user_role = 4;


-- teachers query
SELECT 
	u.user_first_name || ' ' || u.user_last_name AS teacher_full_name,
	u.user_contact AS teacher_contact,
	u.user_age AS teacher_age,
	CASE
		WHEN u.user_gender = 1 THEN 'erkak'
		ELSE 'ayol'
	END AS teacher_gender
FROM users u
RIGHT JOIN teachers t ON t.user_id = u.user_id
WHERE u.user_role = 2;

-- assistants query
SELECT 
	u.user_first_name || ' ' || u.user_last_name AS assistant_full_name,
	u.user_contact AS assistant_contact,
	u.user_age AS assistant_age,
	CASE
		WHEN u.user_gender = 1 THEN 'erkak'
		ELSE 'ayol'
	END AS assistant_gender
FROM users u
RIGHT JOIN assistants a ON a.user_id = u.user_id
WHERE u.user_role = 3;


-- groups query
SELECT 
	g.group_id,
	g.group_name,
	u.user_first_name || ' ' || u.user_last_name AS teacher_full_name
FROM groups g
LEFT JOIN teachers t ON t.teacher_id = g.teacher_id
LEFT JOIN users u ON u.user_id = t.user_id;


SELECT 
	u.user_first_name || ' ' || u.user_last_name AS assistant_full_name,
	u.user_contact AS assistant_contact,
	u.user_age AS assistant_age,
	CASE
		WHEN u.user_gender = 1 THEN 'erkak'
		ELSE 'ayol'
	END AS assistant_gender,
	g.group_name
FROM users u
RIGHT JOIN assistants a ON a.user_id = u.user_id
RIGHT JOIN group_assistants gs ON gs.assistant_id = a.assistant_id
RIGHT JOIN groups g ON g.group_id = gs.group_id
WHERE g.group_id = 4;



SELECT DISTINCT ON(g.group_id) 
	g.group_id,
	g.group_name,
	u.user_first_name || ' ' || u.user_last_name AS teacher_full_name,
	t.teacher_id,
	(
		SELECT COUNT(student_id) FROM group_students WHERE group_id = g.group_id
	)
FROM groups g
INNER JOIN group_students gs ON gs.group_id = g.group_id
INNER JOIN students s ON s.student_id = gs.student_id
INNER JOIN teachers t ON t.teacher_id = g.teacher_id
INNER JOIN users u ON u.user_id = t.user_id



SELECT
	s.student_id,
	u.user_first_name || ' ' || u.user_last_name AS student_full_name,
	u.user_contact AS student_contact,
	u.user_age AS student_age,
	CASE
		WHEN u.user_gender = 1 THEN 'erkak'
		ELSE 'ayol'
	END AS student_gender,
	g.group_name
FROM users u
RIGHT JOIN students s ON s.user_id = u.user_id
RIGHT JOIN group_students gs ON gs.student_id = s.student_id
RIGHT JOIN groups g ON g.group_id = gs.group_id
RIGHT JOIN teachers t ON t.teacher_id = g.teacher_id
WHERE g.group_id = 1



SELECT
	s.student_id,
	u.user_first_name || ' ' || u.user_last_name AS student_full_name,
	u.user_contact AS student_contact,
	u.user_age AS student_age,
	CASE
		WHEN u.user_gender = 1 THEN 'erkak'
		ELSE 'ayol'
	END AS student_gender,
	CASE
		WHEN $1 > 0 THEN g.group_name
		ELSE null
	END AS group_name,
	CASE
		WHEN $1 > 0 THEN ( 
			SELECT 
				SUM(score_value) 
			FROM scores 
			WHERE student_id = s.student_id AND group_id = $1
		) ELSE null
	END AS student_score
FROM users u
RIGHT JOIN students s ON s.user_id = u.user_id
RIGHT JOIN group_students gs ON gs.student_id = s.student_id
RIGHT JOIN groups g ON g.group_id = gs.group_id
RIGHT JOIN teachers t ON t.teacher_id = g.teacher_id
WHERE u.user_role = 4 AND
CASE
	WHEN $1 > 0 THEN g.group_id = $1
	ELSE true
END AND
CASE
	WHEN $2 > 0 THEN t.teacher_id = $2
	ELSE true
END
ORDER BY student_score DESC




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
WHERE u.user_role = 4 AND
CASE
	WHEN $1 > 0 THEN g.group_id = $1
	ELSE true
END AND
CASE
	WHEN $2 > 0 THEN t.teacher_id = $2
	ELSE true
END
ORDER BY student_score DESC





SELECT 
	g.group_id,
	g.group_name,
	u.user_first_name || ' ' || u.user_last_name as teacher_name,
	(
		SELECT 
			COUNT(gs.student_id)
		FROM group_students gs
		WHERE g.group_id = gs.group_id
	) AS student_count,
	(
		SELECT
			COUNT(ga.assistant_id)
		FROM group_assistants ga 
		WHERE ga.group_id = g.group_id
	) AS assistant_count
FROM groups g
RIGHT JOIN teachers t USING(teacher_id)
INNER JOIN users u ON t.user_id = u.user_id;



UPDATE users
 SET user_first_name = 'Yunus'
FROM users u
INNER JOIN teachers t ON t.user_id = u.user_id
WHERE t.teacher_id = 1;
