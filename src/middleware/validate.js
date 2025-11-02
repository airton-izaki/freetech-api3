module.exports = function validate(schema, property = 'body') {
  return (req, res, next) => {
    const data = req[property];
    const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown: true });

    if (error) {
      const details = error.details.map(d => ({ message: d.message, path: d.path }));
      const err = new Error('ValidationError');
      err.status = 400;
      err.type = 'validation';
      err.details = details;
      return next(err);
    }

    req[property] = value;
    return next();
  };
};
