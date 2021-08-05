async function authMiddleware(req, res, next) {
  if (req.body.name !== undefined) {
    next();
  }
  return res.status(401).send("Not Authorized!");
}

module.exports = authMiddleware;
