	INSERT INTO users ( 
		first_name, 
		user_last_name, 
		user_username, 
		user_password, 
		user_contact, 
		user_gender, 
		user_age, 
		user_role  
	) VALUES 
	-- root admin
	('root', 'root', 'root', crypt('root', gen_salt('bf')), '998941023656', 1, 25, 1),
	-- teachers
	('Yunus', 'Yusupov', 'tanqidchi', crypt('1111', gen_salt('bf')), '998971023656', 1, 19, 2),
	('MuhammadJavohir', 'Suratov', 'jewel', crypt('1111', gen_salt('bf')), '998945623478', 1, 26, 2),
	('Muhammad', 'Najimov', 'bigonotation', crypt('1111', gen_salt('bf')), '998995661000', 1, 26, 2),
	-- assistants
	('Abdulloh', 'Falonchiyev', 'abdulloh', crypt('1111', gen_salt('bf')), '998974012356', 1, 20, 3),
	('Alisher', 'Nazirov', 'nz', crypt('1111', gen_salt('bf')), '998974012356', 1, 23, 3),
	('Ulugbek', 'Valiyev', 'rv', crypt('1111', gen_salt('bf')), '998974037891', 1, 20, 3),
	('MuhammadSodiq', 'Xolmuhammedov', 'quddusiy', crypt('1111', gen_salt('bf')), '998974037891', 1, 17, 3),
	-- students
	('Adham', 'Muzaffarov', 'heaven_8', crypt('1111', gen_salt('bf')), '998998000334', 1, 21, 4),
	('Imron', 'Shoimov', 'yunusemro', crypt('1111', gen_salt('bf')), '998974409931', 1, 17, 4),
	('Jahongir', 'Mamanazarov', 'official', crypt('1111', gen_salt('bf')), '998936713228', 1, 19, 4),
	('Jamoliddin', 'Rixsiyev', 'admin0791', crypt('1111', gen_salt('bf')), '998971051560', 1, 18, 4),
	('Abduvohid', 'Abdufattoyev', 'vohid2005', crypt('1111', gen_salt('bf')), '998331251800', 1, 16, 4);


	-- teachers
	INSERT INTO teachers ( user_id ) VALUES ( 2 );
	INSERT INTO teachers ( user_id ) VALUES ( 3 );
	INSERT INTO teachers ( user_id ) VALUES ( 4 );
	-- asistents
	INSERT INTO assistants ( user_id ) VALUES ( 5 );
	INSERT INTO assistants ( user_id ) VALUES ( 6 );
	INSERT INTO assistants ( user_id ) VALUES ( 7 );
	INSERT INTO assistants ( user_id ) VALUES ( 8 );

	-- students
	INSERT INTO students ( user_id ) VALUES ( 9 );
	INSERT INTO students ( user_id ) VALUES ( 10 );
	INSERT INTO students ( user_id ) VALUES ( 11 );
	INSERT INTO students ( user_id ) VALUES ( 12 );
	INSERT INTO students ( user_id ) VALUES ( 13 );

	-- groups
	INSERT INTO groups ( group_name, teacher_id ) VALUES ( 'Web-standart', 1 );
	INSERT INTO groups ( group_name, teacher_id ) VALUES ( 'Fronted odatiy', 1 );
	INSERT INTO groups ( group_name, teacher_id ) VALUES ( 'Go backend', 3 );
	INSERT INTO groups ( group_name, teacher_id ) VALUES ( 'Fronted bootcamp', 2 );

	-- group assistens
	INSERT INTO group_assistants ( group_id, assistant_id ) VALUES ( 1, 4 );
	INSERT INTO group_assistants ( group_id, assistant_id ) VALUES ( 2, 4 );
	INSERT INTO group_assistants ( group_id, assistant_id ) VALUES ( 3, 3 );
	INSERT INTO group_assistants ( group_id, assistant_id ) VALUES ( 4, 2 );
	INSERT INTO group_assistants ( group_id, assistant_id ) VALUES ( 4, 1 );

	-- group students
	INSERT INTO group_students ( group_id, student_id ) VALUES ( 1, 5 );
	INSERT INTO group_students ( group_id, student_id ) VALUES ( 1, 4 );
	INSERT INTO group_students ( group_id, student_id ) VALUES ( 2, 3 );
	INSERT INTO group_students ( group_id, student_id ) VALUES ( 3, 1 );
	INSERT INTO group_students ( group_id, student_id ) VALUES ( 3, 2 );
	INSERT INTO group_students ( group_id, student_id ) VALUES ( 4, 4 );
	INSERT INTO group_students ( group_id, student_id ) VALUES ( 4, 1 );

	INSERT INTO scores ( group_id, student_id, score_value, score_desc ) VALUES
	( 1, 5, 25, 'yaxshi'),
	( 1, 5, 60, 'zor'),
	( 1, 5, 80, 'alo'),
	( 1, 4, 10, 'yomon'),
	( 1, 4, 5, 'haydalishiz mumkin'),
	( 1, 4, 80, 'barakalla'),
	( 2, 3, 50, 'yomonmas'),
	( 2, 3, 72, 'yomonmas'),
	( 2, 3, 63, 'yaxshi'),
	( 3, 1, 5, 'judam yomon'),
	( 3, 1, 30, 'yaxshi'),
	( 3, 1, 50, 'alo'),
	( 3, 2, 0, 'haydalishiz mumkin'),
	( 3, 2, 60, 'barakalla'),
	( 3, 2, 15, 'yomon'),
	( 4, 4, 70, 'yaxshi'),
	( 4, 4, 90, 'zor'),
	( 4, 4, 100, 'alo'),
	( 4, 4, 73, 'yaxshi'),
	( 4, 1, 60, 'yaxshi'),
	( 4, 1, 80, 'yaxshi'),
	( 4, 1, 49, 'yaxshi');
