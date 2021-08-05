const { errorMiddleware } = require("./error-middleware");
const authMiddleware = require("./auth-middlewares");

module.exports = {
  errorMiddleware: errorMiddleware,
  authMiddleware: authMiddleware
};
