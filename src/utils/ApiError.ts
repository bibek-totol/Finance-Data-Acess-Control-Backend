import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static badRequest(message: string, details?: unknown) {
    return new ApiError(StatusCodes.BAD_REQUEST, message, details);
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApiError(StatusCodes.UNAUTHORIZED, message);
  }

  static forbidden(message = 'Forbidden') {
    return new ApiError(StatusCodes.FORBIDDEN, message);
  }

  static notFound(message = 'Not found') {
    return new ApiError(StatusCodes.NOT_FOUND, message);
  }

  static conflict(message: string, details?: unknown) {
    return new ApiError(StatusCodes.CONFLICT, message, details);
  }
}
