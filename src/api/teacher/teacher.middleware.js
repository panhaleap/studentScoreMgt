import Joi from 'joi';
import { errorValidation } from '../../common/response';

// const subjectCreatedSchema = Joi.object().keys({
//     firstName: Joi.string().alphanum().max(30).required(),
//     lastNam: Joi.string().alphanum().max(30).required()
// }).with('firstName', 'lastName');

// const subjectUpdatedSchema = Joi.object().keys({
//     firstName: Joi.string().alphanum().max(30),
//     lastNam: Joi.string().alphanum().max(30)
// }).with('firstName', 'lastName');

const subjectQuerySchema = Joi.object().keys({
  limit: Joi.number(),
  page: Joi.number()
});

// export const checkCreatedSubject = (req, res, next) => {
//     const { error } = Joi.valid(req.body, studentCreatedSchema);
//     if (error === null) {next();}
//     else {
//         console.log(error);
//         errorValidation(res, error, 422);}
// };

// export const checkQuerySubject = (req, res, next) => {
//     const { error } = Joi.validate(req.query, subjectQuerySchema);
//     if (error === null) next();
//     else errorValidation(res, { 'error': error.name, 'message': error.message }, 422);
// };
