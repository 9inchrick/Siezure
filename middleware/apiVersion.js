const apiVersion = (req, res, next) => {
  const version = req.get('Accept-Version') || '1.0.0';
  
  req.apiVersion = version;
  
  // Add version to response headers
  res.setHeader('X-API-Version', version);
  next();
};

module.exports = apiVersion;