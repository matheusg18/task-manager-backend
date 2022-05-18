import { RequestHandler } from 'express';
import joi from 'joi';
import { BadRequest } from '../http-errors';

const schema = joi.object({
  id: joi.string().guid().messages({
    'string.guid': 'incorrect "id" format',
  }),
});

const validateParamsId: RequestHandler = (req, _res, next) => {
  const { id } = req.params;
  const { error } = schema.validate({ id });

  if (error) return next(new BadRequest(error.message));

  return next();
};

export default validateParamsId;
