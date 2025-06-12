const Joi = require("joi");

const eventCompensationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    companyName: Joi.string().min(2).max(500).required(),
    directorName: Joi.string().min(2).max(500).required(),
    posada: Joi.string().min(2).max(500).required(),
    companyPhone: Joi.string().min(2).max(100).required(),
    companyEmail: Joi.string().min(2).max(100).required(),
    nameZahodu: Joi.string().min(2).max(500).required(),
    nameOperator: Joi.string().min(2).max(500).required(),
    dateFrom: Joi.string().min(2).max(500).required(),
    dateTo: Joi.string().min(2).max(500).required(),
    location: Joi.string().min(2).max(500).required(),
    suma: Joi.string().min(2).max(10).required(),
  }).unknown(true);

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({
      code: 400,
      message:
        "Одне або декілька полів не заповнені. Перевірте будь ласка дані.",
      messageOrigin: validationResult.error.details,
    });
  }

  next();
};

module.exports = {
  eventCompensationMiddleware,
};
