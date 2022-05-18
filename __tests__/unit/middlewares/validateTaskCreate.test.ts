import { Request, Response } from 'express';
import { TASK_CONTENT_MAX_LENGTH } from '../../../src/constants';
import { BadRequest } from '../../../src/http-errors';
import { validateTaskCreate } from '../../../src/middlewares';

const fakeRequest = {
  success: 'fake task',
  contentNumber: 1234,
  contentBoolean: true,
  contentNull: null,
  contentEmpty: '',
  contentLarge: 'a'.repeat(TASK_CONTENT_MAX_LENGTH + 1),
};

describe('validateTaskCreate - unit test', () => {
  describe('when everything is OK', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    beforeAll(() => {
      req.body = { content: fakeRequest.success };
    });

    it('should just call next', () => {
      validateTaskCreate(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe('when content', () => {
    describe('is a number', () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      beforeAll(() => {
        req.body = { content: fakeRequest.contentNumber };
      });

      it('should call next with BadRequest error', () => {
        validateTaskCreate(req, res, next);

        expect(next).toHaveBeenCalledWith(new BadRequest('"content" must be a string'));
      });
    });

    describe('is a boolean', () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      beforeAll(() => {
        req.body = { content: fakeRequest.contentBoolean };
      });

      it('should call next with BadRequest error', () => {
        validateTaskCreate(req, res, next);

        expect(next).toHaveBeenCalledWith(new BadRequest('"content" must be a string'));
      });
    });

    describe('is null', () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      beforeAll(() => {
        req.body = { content: fakeRequest.contentNull };
      });

      it('should call next with BadRequest error', () => {
        validateTaskCreate(req, res, next);

        expect(next).toHaveBeenCalledWith(new BadRequest('"content" must be a string'));
      });
    });

    describe('is an empty string', () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      beforeAll(() => {
        req.body = { content: fakeRequest.contentEmpty };
      });

      it('should call next with BadRequest error', () => {
        validateTaskCreate(req, res, next);

        expect(next).toHaveBeenCalledWith(
          new BadRequest('"content" must have at least 1 character'),
        );
      });
    });

    describe('is a large string', () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      beforeAll(() => {
        req.body = { content: fakeRequest.contentLarge };
      });

      it('should call next with BadRequest error', () => {
        validateTaskCreate(req, res, next);

        expect(next).toHaveBeenCalledWith(
          new BadRequest(`"content" must have at maximum ${TASK_CONTENT_MAX_LENGTH} characters`),
        );
      });
    });
  });
});
