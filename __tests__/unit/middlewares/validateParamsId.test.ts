import { Request, Response } from 'express';
import { BadRequest } from '../../../src/http-errors';
import { validateParamsId } from '../../../src/middlewares';

const fakeRequest = {
  success: '23457e31-277e-48b0-bc47-607c4fabb942',
  idNotUuid: 'fakeid',
};

describe('validateParamsId - unit test', () => {
  describe('when everything is OK', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    beforeAll(() => {
      req.params = { id: fakeRequest.success };
    });

    it('should just call next', () => {
      validateParamsId(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe('when id is not uuid', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    beforeAll(() => {
      req.params = { id: fakeRequest.idNotUuid };
    });

    it('should call next with BadRequest error', () => {
      validateParamsId(req, res, next);

      expect(next).toHaveBeenCalledWith(new BadRequest('incorrect "id" format'));
    });
  });
});
