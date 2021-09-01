const Joi = require("joi");


const userUpdateValidation = new Joi.object({
    fullName: Joi.string()
        .min(8)
        .max(65)
        .error(new Error('Phone number is incored'))
        .required(),
    phone: Joi.number()
        .min(10000)
        .max(999999999999)
        .error(new Error('Phone number is incored'))
        .required(),
    id: Joi.number().required()
});

module.exports = {
    userUpdateValidation
}