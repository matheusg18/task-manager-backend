import { Request, Response } from 'express';
import { BadRequest, NotFound } from '../../../src/http-errors';
import { errorMiddleware } from '../../../src/middlewares';

describe('error middleware - unit test', () => {
  describe('when BadRequest is thrown', () => {
    let err: BadRequest;
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    beforeAll(() => {
      err = new BadRequest('bad request');

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();
    });

    it('should send status 400 and the error message', () => {
      errorMiddleware(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'bad request' });
    });
  });

  describe('when NotFound is thrown', () => {
    let err: NotFound;
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    beforeAll(() => {
      err = new NotFound('not found');

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();
    });

    it('should send status 404 and the error message', () => {
      errorMiddleware(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'not found' });
    });
  });

  describe('when an unexpected error is thrown', () => {
    let err: Error;
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    beforeAll(() => {
      err = new Error('unexpected error');

      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn();

      console.log = jest.fn();
    });

    it('should send status 500, send the error message and call console.log', () => {
      errorMiddleware(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'unexpected error' });
      expect(console.log).toHaveBeenCalled();
    });
  });
});
