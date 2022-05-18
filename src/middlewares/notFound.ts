import { RequestHandler } from 'express';

const notFound: RequestHandler = (req, res, _next) => {
  res.status(404).json({ message: 'this route does not exist' });
};

export default notFound;
