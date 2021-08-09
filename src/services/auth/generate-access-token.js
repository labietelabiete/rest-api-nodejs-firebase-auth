const jwt = require("jsonwebtoken");
const { config } = require("../../config");

function generateToken(data) {
  return jwt.sign(data, config.auth.secret, { expiresIn: "20s" });
}

module.exports = {
  generateToken: generateToken,
};
