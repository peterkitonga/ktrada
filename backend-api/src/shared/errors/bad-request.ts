import BaseError from '@src/shared/errors/base';
import { HttpStatusCodes } from '@src/shared/enums/http-status';

export default class BadRequestError extends BaseError {
  public constructor(public message: string) {
    super('BadRequestError', HttpStatusCodes.BAD_REQUEST, message);
  }
}
