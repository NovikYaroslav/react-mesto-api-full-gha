const jsonwebtoken = require('jsonwebtoken');
const { pickKey } = require('../utils/pickKey');
const AuthorizationError = require('../utils/errors/AuthorizationError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new AuthorizationError('Authorization required'));
  }

  let payload;
  const jwt = authorization.replace('Bearer ', '');
  try {
    const key = pickKey();
    console.log(key);
    payload = jsonwebtoken.verify(jwt, key);
  } catch (err) {
    next(new AuthorizationError('Authorization required'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
