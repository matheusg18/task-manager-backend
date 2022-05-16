import { RequestHandler } from 'express';
import joi from 'joi';
import { TASK_CONTENT_MAX_LENGTH } from '../constants';
import { BadRequest } from '../http-errors';
import { ITaskCreateRequest } from '../interfaces';

const schema = joi.object({
  content: joi.string().max(TASK_CONTENT_MAX_LENGTH).messages({
    'string.base': '"content" must be a string',
    'string.empty': '"content" must have at least 1 character',
    'string.max': `"content" must have at maximum ${TASK_CONTENT_MAX_LENGTH} characters`,
  }),
});

const validateTaskCreate: RequestHandler = (req, _res, next) => {
  const { content } = req.body as ITaskCreateRequest;
  const { error } = schema.validate({ content });

  if (error) return next(new BadRequest(error.message));

  return next();
};

export default validateTaskCreate;
