import { ErrorRequestHandler } from 'express';
import HttpError from '../http-errors/HttpError';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    const { httpCode, message } = err;

    return res.status(httpCode).json({ message });
  }

  console.log(err);
  return res.status(500).json({ message: err.message });
};

export default errorMiddleware;
