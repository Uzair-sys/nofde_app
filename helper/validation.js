
const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().required(),

  institute: Joi.string().required(),
  year: Joi.string().required(),
  email: Joi.string().required(),

  password: Joi.string()
  .alphanum()
  .required()
  .min(6),

  // repeat_password: Joi.ref("password"),



  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
});
module.exports=schema