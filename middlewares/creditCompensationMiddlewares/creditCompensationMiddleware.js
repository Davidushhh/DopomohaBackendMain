const Joi = require("joi");

const creditCompensationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    companyName: Joi.string().min(2).max(500).required(),
    companyType: Joi.string().min(2).max(500).required(),
    companyPhone: Joi.string().min(2).max(500).required(),
    directorName: Joi.string().min(2).max(500).required(),
    directorInitials: Joi.string().min(2).max(500).required(),
    bankName: Joi.string().min(2).max(500).required(),
    projectName: Joi.string().min(2).max(500).required(),
    creditFile: Joi.required(),
    vupuska: Joi.required(),
    dovidkaZaborg: Joi.required(),
    dovidkaBank: Joi.required(),
    productionInfo: Joi.any(),
    financePlan: Joi.any(),
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
  creditCompensationMiddleware,
};
