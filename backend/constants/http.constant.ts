export enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export enum HTTPMessage {
  OK = "Ok",
  CREATED = "Created",
  BAD_REQUEST = "Email or password are not valid",
  UNAUTHORIZED = "Unauthorized",
  FORBIDDEN = "Forbidden",
  NOT_FOUND = "Not found",
  CONFLICT = "Conflict",
  DELETED = "Item was deleted",
  MISSING_FIELD = "missing required name field",
  CONFLICT_EMAIL = "This email already in use",
}
