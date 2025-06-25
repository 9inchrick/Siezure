const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // 1 minute

module.exports = (duration) => {
  return (req, res, next) => {
    if (req.method !== 'GET') return next();
    const key = req.originalUrl;
    const cached = cache.get(key);
    if (cached) return res.json(cached);
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.sendResponse(body);
    };
    next();
  };
};