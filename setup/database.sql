\c postgres
DROP DATABASE IF EXISTS score_db;
CREATE DATABASE score_db;
\c score_db;
CREATE EXTENSION pgcrypto;

/*
	1. Admin
	2. Teacher
	3. Assistant
	4. Student
*/

CREATE TABLE users (
	user_id serial primary key,
	user_first_name varchar(32) not null,
	user_last_name varchar(32),
	user_username varchar(32) not null unique,
	user_password varchar(256) not null,
	user_contact varchar(12) not null,
	user_gender smallint not null,
	user_age smallint not null,
	user_role smallint not null,
	user_created_at timestamptz default current_timestamp,
	user_deleted_at timestamptz default null
);

CREATE TABLE teachers (
	teacher_id serial primary key,
	user_id int not null references users(user_id)
);

CREATE TABLE assistants (
	assistant_id serial primary key,
	user_id int not null references users(user_id)
);

CREATE TABLE students (
	student_id serial primary key,
	user_id int not null references users(user_id)
);

CREATE TABLE groups (
	group_id serial primary key,
	group_name varchar(32) not null,
	teacher_id int not null references teachers(teacher_id)
);

CREATE TABLE group_students (
	group_id int not null references groups(group_id) ON DELETE CASCADE,
	student_id int not null references students(student_id)
);

CREATE TABLE group_assistants (
	group_id int not null references groups(group_id) ON DELETE CASCADE,
	assistant_id int not null references assistants(assistant_id)
);

CREATE TABLE scores (
	score_id serial primary key,
	score_desc text,
	score_value int not null,
	student_id int not null references students(student_id),
	group_id int not null references groups(group_id) ON DELETE CASCADE,
	score_created_at timestamptz default current_timestamp
);



/*
	user

	teacher
	assistant
	student

	groups
	scores

*/