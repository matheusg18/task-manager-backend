import { RequestHandler } from 'express';
import joi from 'joi';
import { TASK_CONTENT_MAX_LENGTH, TASK_STATUS } from '../constants';
import { BadRequest } from '../http-errors';
import { ITaskUpdateRequest } from '../interfaces';

const schema = joi.object({
  content: joi.string().max(TASK_CONTENT_MAX_LENGTH).messages({
    'string.base': '"content" must be a string',
    'string.empty': '"content" must have at least 1 character',
    'string.max': `"content" must have at maximum ${TASK_CONTENT_MAX_LENGTH} characters`,
  }),
  status: joi.valid(TASK_STATUS.PENDING, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE).messages({
    'any.only': '"status" can only be "PENDING", "IN_PROGRESS", "DONE"',
  }),
});

const validateTaskUpdate: RequestHandler = (req, _res, next) => {
  const { content, status } = req.body as ITaskUpdateRequest;
  const { error } = schema.validate({ content, status });

  if (error) return next(new BadRequest(error.message));

  return next();
};

export default validateTaskUpdate;
