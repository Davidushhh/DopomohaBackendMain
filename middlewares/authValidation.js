const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    login: Joi.string().min(3).max(50).required(),
    userName: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        // tlds: { allow: ["com", "net"] },
      })
      .required(),
    borderSquad: Joi.string().min(3).max(100).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details,
      code: 400,
    });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    login: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details,
      code: 400,
    });
  }

  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
