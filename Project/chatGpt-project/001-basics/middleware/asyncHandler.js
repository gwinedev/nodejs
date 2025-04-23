const asyncHandler = (fn) => (req, res, next) => {
  Promise.resole(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
