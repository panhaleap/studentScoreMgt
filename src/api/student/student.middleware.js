import Joi from 'joi';
import { errorValidation } from '../../common/response';

const studentCreatedSchema = Joi.object()
  .keys({
    firstName: Joi.string()
      .alphanum()
      .max(30)
      .required(),
    lastNam: Joi.string()
      .alphanum()
      .max(30)
      .required()
  })
  .with('firstName', 'lastName');

const studentUpdatedSchema = Joi.object()
  .keys({
    firstName: Joi.string()
      .alphanum()
      .max(30),
    lastNam: Joi.string()
      .alphanum()
      .max(30)
  })
  .with('firstName', 'lastName');

const studentQuerySchema = Joi.object().keys({
  limit: Joi.number(),
  page: Joi.number()
});

export const checkCreatedStudent = (req, res, next) => {
  const { error } = Joi.valid(req.body, studentCreatedSchema);
  if (error === null) {
    next();
  } else {
    console.log(error);
    errorValidation(res, error, 422);
  }
};

export const checkQueryStudent = (req, res, next) => {
  const { error } = Joi.validate(req.query, studentQuerySchema);
  if (error === null) next();
  else errorValidation(res, { error: error.name, message: error.message }, 422);
};
