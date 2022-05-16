import HttpError from './HttpError';

export default class BadRequest extends HttpError {
  public httpCode: number;

  public name: string;

  constructor(message: string, httpCode = 400) {
    super(message);

    this.httpCode = httpCode;
    this.name = 'BadRequest';
  }
}
