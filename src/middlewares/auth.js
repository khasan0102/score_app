const { verify } = require('../lib/jwt');
const {fetch, fetchAll } = require("../lib/postgres");

const USER_ROLE = `
SELECT 
    CASE
        WHEN user_role = 1 THEN 'admin'
        WHEN user_role = 2 THEN 'teacher'
        WHEN user_role = 3 THEN 'assistant'
        WHEN user_role = 4 THEN 'student'
    END AS user_role
FROM users 
WHERE user_id = $1`;

const STUDENT_GROUPS = `
    SELECT 
        gs.group_id
    FROM group_students gs
    INNER JOIN students s ON s.student_id = gs.student_id
    INNER JOIN users u ON u.user_id = s.user_id
    WHERE u.user_id = $1
`

const TEACHER_GROUPS = `
    SELECT 
        g.group_id
    FROM groups g
    INNER JOIN teachers t ON t.teacher_id = g.teacher_id
    INNER JOIN users u ON u.user_id = t.user_id
    WHERE u.user_id = $1
`
const ASSISTANT_GROUPS = `
    SELECT 
        ga.group_id
    FROM group_assistants ga
    INNER JOIN assistants a ON a.assistant_id = ga.assistant_id
    INNER JOIN users u ON u.user_id = a.user_id
    WHERE u.user_id = $1
`
const ADMIN_GROUPS = `
    SELECT 
        * 
    FROM groups
`
module.exports = async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if((req.url == '/' || req.url == '/login') && !token) return next();  
        let payload = verify(token);
        if(req.url == '/login' && req.cookies.token) return res.redirect('/');
        let userId = payload.user_id;

        let role = await fetch(USER_ROLE, userId);
        role = role.user_role;
        if (role == 'student') {
            let groups = await fetchAll(STUDENT_GROUPS, userId);
            groups = groups.map(el => el.group_id)
            req.userInfo = {
                userId,
                role,   
                groups
            }
            return next();
        } else if(role == 'teacher'){
            let groups = await fetchAll(TEACHER_GROUPS, userId);
            groups = groups.map(el => el.group_id)
            req.userInfo = {
                userId,
                role,
                groups
            }
            return next();
        } else if(role == 'assistant'){
            let groups = await fetchAll(ASSISTANT_GROUPS, userId);
            groups = groups.map(el => el.group_id)
            req.userInfo = {
                userId,
                role,
                groups
            }
            return next();
        }else if(role == 'admin'){
            let groups = await fetchAll(ADMIN_GROUPS);
            groups = groups.map(el => el.group_id)
            req.userInfo = {
                userId,
                role,
                groups
            }
            return next();
        }
        next();
    } catch (err) {
        return res.render('index.html', {
            header: "public/header.html",
            headerData: {
                links: [],
                input: false,
                isLoggedIn: false
            },
            html: "public/login.html",
            data: {
                errorMessage: "You mast be logged"
            }
        });
    } 
}