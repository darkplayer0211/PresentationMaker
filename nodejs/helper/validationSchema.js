const Joi = require('@hapi/joi');

const songSchema = Joi.object({
    name: Joi.string().required(),
    lyrics: Joi.string().required()
});

module.exports = {
    songSchema
}