const jwt = require("jsonwebtoken");
const { config } = require("../../config");

async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    const res = jwt.verify(token, config.auth.secret);
    // logic control
    if (!res) reject("JWT valitadion error");
    // res : payload specified when generating token
    resolve(res);
  });
}

module.exports = {
  verifyToken: verifyToken,
};
