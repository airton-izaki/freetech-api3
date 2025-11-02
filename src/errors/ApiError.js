function ApiError(message, status = 500, details = null, code = null) {
  const error = new Error(message);
  error.name = 'ApiError';
  error.status = status;
  error.details = details;
  error.code = code;
  return error;
}

module.exports = ApiError;
