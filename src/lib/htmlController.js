const path = require("path");

module.exports = (userInfo, body, header) => {
    let basename = path.basename(body.html || "public/table.html", '.html')
    userInfo = userInfo || {};
    body = body || {};
    header = header || {};
    let links;
    if (userInfo.role == 'admin' || userInfo.role == 'teacher' || userInfo.role == 'assistant') {
        links = [
            { link: '/assistants', text: 'mentorlar' },
            { link: '/groups', text: 'guruhlar' },
            { link: '/teachers', text: 'ustozlar' },
            { link: '/admin', text: 'admin' },
        ];
    }else if (userInfo.role == 'student'){
        links = [
            { link: '/assistants', text: 'mentorlar' },
            { link: '/groups', text: 'guruhlar' },
            { link: '/teachers', text: 'ustozlar' }
        ];
    } else {
        links = [];
    }


    let data;
    if(basename === "table") {
        data = {
            table: body.table,
            tableName1: body.tableName1 || '',
            tableName2: body.tableName2 || '',
        }
    }else if (basename === "login"){
        data = {
            errorMessage: body.errorMessage || null
        }
    } else if (basename === "admin"){
        data = {
            panel: body.panel || 'table-groups.html',
            data: body.data || []
        }
    }

    return [
        'index.html',
        {
            header: header.header || 'public/header.html',
            headerData: {
                links, 
                isLoggedIn: userInfo.role ? true : false
            },
            html: body.html || 'public/table.html',
            data
        }
    ]
}