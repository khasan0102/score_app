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



const scoreUpdateValidation = new Joi.object({
    id: Joi.number().required().error(new Error('Id is incoored')),
    scoreValue: Joi.number().min(0).max(100).required().error( new Error("Score value is incorred")),
    description: Joi.string().min(3).required().error(new Error('Description is incorred!'))
});

module.exports = {
    userUpdateValidation,
    scoreUpdateValidation
}