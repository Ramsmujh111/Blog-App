const Joi = require('joi');

const ValidateSchema = Joi.object({
    UserName:Joi.string().alphanum().min(3).max(20).required(),
    Email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const ValidateLogin = Joi.object({
    Email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

module.exports = {
    ValidateSchema,
    ValidateLogin
}
