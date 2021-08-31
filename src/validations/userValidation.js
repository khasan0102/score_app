const Joi = require("joi");


const userUpdateValidation = new Joi.object({
    fullName: Joi.string()
                 .min(8)
                 .max(65)
                 .required(),
    phone: Joi.string().required().min(7).max(10)
});

module.exports = {
    userUpdateValidation
}