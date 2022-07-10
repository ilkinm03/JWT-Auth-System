export default class ApiError<
  T extends string,
  U extends number
> extends Error {
  status: U;
  errors: object | undefined;
  message: T;

  constructor(status: U, message: T, errors?: object | undefined) {
    super(message);
    this.errors = errors;
    this.status = status;
    this.message = message;
  }
  static UnauthorizedError(message = "You are not authenticated!") {
    return new ApiError(401, message);
  }

  static BadRequest(message = "Bad Request") {
    return new ApiError(400, message);
  }

  static ConflictException(message = "Already exist") {
    return new ApiError(409, message);
  }

  static ForbiddenException(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static GeneralException(message = "Internal server error") {
    return new ApiError(500, message);
  }

  static ServiceUnavailableException(message = "Service Unavailable") {
    return new ApiError(503, message);
  }

  static NotFoundException(message = "Not found") {
    return new ApiError(404, message);
  }

  static ValidationError(message: string, errors: object) {
    return new ApiError(400, message, errors);
  }
}
