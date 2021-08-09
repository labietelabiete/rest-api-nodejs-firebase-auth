const { verifyToken } = require("../services/auth/verify-access-token");

async function authMiddleware(req, res, next) {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      const userClaims = await verifyToken(req.headers.authorization.substr(7));
      req.user = userClaims;
      next();
    }
  } catch (err) {
    return res.status(401).send("Not Authorized!");
  }
}

module.exports = authMiddleware;
