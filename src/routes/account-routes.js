const Router = require("express").Router;

const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");
const authRouter = Router();

authRouter.post("/authenticate", userController.signIn);
authRouter.post("/refresh-token", userController.refreshToken);

module.exports = {
  authRouter: authRouter,
};
