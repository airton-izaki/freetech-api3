const ApiError = require('../errors/ApiError');

// middleware global de tratamento de erros
module.exports = function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        code: err.code || null,
        details: err.details || null,
      },
    });
  };

  // erros de validação via validate.js (criado acima) terão err.type === 'validation'
  if (err.type === 'validation') {
    return res.status(err.status || 400).json({
      error: {
        message: 'Validation failed',
        details: err.details || null,
      },
    });
  };

  // Erros do mongoose (ex.: cast errors, validation errors) - exemplo de tratamento
  if (err.name === 'ValidationError' && err.errors) {
    const details = Object.keys(err.errors).map(k => ({ path: k, message: err.errors[k].message }));
    return res.status(400).json({ error: { message: 'Database validation error', details } });
  };

  if (err.name === 'CastError') {
    return res.status(400).json({ error: { message: 'Invalid id format', details: { path: err.path, value: err.value } } });
  };

  // Falhas de autenticação/autorization costumam vir com status 401/403
  if (err.status && [401, 403].includes(err.status)) {
    return res.status(err.status).json({ error: { message: err.message || 'Unauthorized' } });
  };

  // fallback: erro desconhecido
  console.error(err);
  return res.status(err.status || 500).json({
    error: {
      message: 'Internal Server Error',
      details: process.env.NODE_ENV === 'production' ? null : (err.stack || err.message),
    },
  });
};
