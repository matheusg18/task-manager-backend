import { Request, Response } from 'express';
import { notFound } from '../../../src/middlewares';

describe('notFound middleware - unit test', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = jest.fn();

  beforeAll(() => {
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
  });

  it('should send status 404 and the not found message', () => {
    notFound(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'this route does not exist' });
    expect(next).not.toHaveBeenCalled();
  });
});
