const { v4: uuidv4 } = require('uuid');
const logger = require('./logger');

module.exports = (req, res, next) => {
  req.requestId = uuidv4();
  res.setHeader('X-Request-Id', req.requestId);
  logger.info(`[${req.requestId}] ${req.method} ${req.originalUrl}`);
  next();
};