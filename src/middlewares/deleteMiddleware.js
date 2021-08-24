module.exports = (req, res, next) => {
    if(req.userInfo.role == 'assistant') {
        return res.status(400).json({status: 400, message: "You have no right to it"})
    }

    next()
}