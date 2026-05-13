const Joi = require("joi");

const financialSupportDamageMiddleware = (req, res, next) => {
  const schema = Joi.object({
    subjectEntity: Joi.string().max(2000).allow(""),
    expenseSpecification: Joi.string().max(2000).allow(""),
    stateAidInfo: Joi.string().max(4000).allow(""),
    directorPosition: Joi.string().max(500).allow(""),
    directorName: Joi.string().max(500).allow(""),
  }).unknown(true);

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      code: 400,
      message:
        "Одне або декілька полів містять некоректні дані. Перевірте будь ласка.",
      messageOrigin: validationResult.error.details,
    });
  }

  next();
};

module.exports = {
  financialSupportDamageMiddleware,
};
