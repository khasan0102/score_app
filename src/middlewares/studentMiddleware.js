const htmlController = require('../lib/htmlController.js')

module.exports = (req, res, next) => {
    if(!req.userInfo) res.redirect('/login');
    let { role } = req.userInfo;
    if(role == 'student'){
         return res.render(...htmlController(req.userInfo, { html: 'public/error.html'}))
    }

    next();
}