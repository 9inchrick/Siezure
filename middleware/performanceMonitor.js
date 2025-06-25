const logger = require('../utils/logger');

const performanceMonitor = (req, res, next) => {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const time = diff[0] * 1e3 + diff[1] * 1e-6; // Convert to milliseconds

    if (time > 1000) { // Log slow requests (>1s)
      logger.warn({
        type: 'slow_request',
        path: req.path,
        method: req.method,
        duration: `${time.toFixed(2)}ms`,
        query: req.query,
        body: req.body
      });
    }
  });

  next();
};

module.exports = performanceMonitor;