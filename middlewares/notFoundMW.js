export default (req, res, next) => {
  return res.status(404).json({
    message: `current endpoint ${req.url} not found`,
  });
};