import { Request, Response } from 'express';
import { TASK_CONTENT_MAX_LENGTH, TASK_STATUS } from '../../../src/constants';
import { BadRequest } from '../../../src/http-errors';
import { validateTaskUpdate } from '../../../src/middlewares';

const fakeRequest = {
  content: {
    success: 'fake task',
    contentNumber: 1234,
    contentBoolean: true,
    contentNull: null,
    contentEmpty: '',
    contentLarge: 'a'.repeat(TASK_CONTENT_MAX_LENGTH + 1),
  },
  status: {
    success: TASK_STATUS.IN_PROGRESS,
    statusWrong: 'CANCEL',
  },
};

describe('validateTaskUpdate - unit test', () => {
  describe('when everything is OK', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn();

    beforeAll(() => {
      req.body = { content: fakeRequest.content.success, status: fakeRequest.status.success };
    });

    it('should just call next', () => {
      validateTaskUpdate(req, res, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe('when content', () => {
    describe('is a number', () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      beforeAll(() => {
        req.body = { content: fakeRequest.content.contentNumber };
      });

      it('should call next with BadRequest error', () => {
        validateTaskUpdate(req, res, next);

        expect(next).toHaveBeenCalledWith(new BadRequest('"content" must be a string'));
      });
    });

    describe('is a boolean', () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      beforeAll(() => {
        req.body = { content: fakeRequest.content.contentBoolean };
      });

      it('should call next with BadRequest error', () => {
        validateTaskUpdate(req, res, next);

        expect(next).toHaveBeenCalledWith(new BadRequest('"content" must be a string'));
      });
    });

    describe('is null', () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      beforeAll(() => {
        req.body = { content: fakeRequest.content.contentNull };
      });

      it('should call next with BadRequest error', () => {
        validateTaskUpdate(req, res, next);

        expect(next).toHaveBeenCalledWith(new BadRequest('"content" must be a string'));
      });
    });

    describe('is an empty string', () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      beforeAll(() => {
        req.body = { content: fakeRequest.content.contentEmpty };
      });

      it('should call next with BadRequest error', () => {
        validateTaskUpdate(req, res, next);

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
        req.body = { content: fakeRequest.content.contentLarge };
      });

      it('should call next with BadRequest error', () => {
        validateTaskUpdate(req, res, next);

        expect(next).toHaveBeenCalledWith(
          new BadRequest(`"content" must have at maximum ${TASK_CONTENT_MAX_LENGTH} characters`),
        );
      });
    });
  });

  describe('when status', () => {
    describe('is an incorrect status string', () => {
      const req = {} as Request;
      const res = {} as Response;
      const next = jest.fn();

      beforeAll(() => {
        req.body = { status: fakeRequest.status.statusWrong };
      });

      it('should call next with BadRequest error', () => {
        validateTaskUpdate(req, res, next);

        expect(next).toHaveBeenCalledWith(
          new BadRequest('"status" can only be "PENDING", "IN_PROGRESS", "DONE"'),
        );
      });
    });
  });
});
