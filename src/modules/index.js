const publicModules = require("./public")
const adminModule = require("./admin");

module.exports = [
    ...publicModules, ...adminModule
];