const db = require("../models");
const { encryptString, compareEncrypted } = require("../utils/encrypt");
const { generateToken } = require("../services/auth/generate-access-token");
const { sessionData } = require("../session/session");
const randtoken = require("rand-token");

async function register(req, res, next) {
  const { name, surname, email, password } = req.body;

  try {
    const encryptedPassword = await encryptString(password);

    const { _id } = await db.User.create({
      name: name,
      surname: surname,
      email: email,
      password: encryptedPassword,
    });

    return res.status(201).send({
      message: "User created successfully!",
      data: {
        id: _id,
      },
    });
  } catch (err) {
    return res.status(500).send({
      error: err,
    });
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ email: email });

    if (user) {
      const isValid = await compareEncrypted({
        plainData: password,
        encryptedData: user.password,
      });
      if (isValid) {
        const accessToken = generateToken({ email: user.email });
        const refreshToken = randtoken.generate(256);

        sessionData.refreshTokens[refreshToken] = user.email;

        return res.status(200).send({
          isSuccessful: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
          id: user._id,
        });
      } else {
        return res.status(401).send({
          error: "Invalid Credentials",
        });
      }
    } else {
      return res.status(401).send({
        error: "Invalid Credentials",
      });
    }
  } catch (err) {
    return res.status(500).send({
      isSuccessful: false,
      error: err,
    });
  }
}

async function refreshToken(req, res, next) {
  const { email, refreshToken } = req.body;

  try {
    console.log(sessionData.refreshTokens[refreshToken] == email);

    if (
      refreshToken in sessionData.refreshTokens &&
      sessionData.refreshTokens[refreshToken] == email
    ) {
      const accessToken = generateToken({ email: email });

      return res.status(200).send({
        isSuccessful: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      return res.status(500).send({
        error: "Something went wrong! 2",
      });
    }
  } catch (err) {
    // console.log(err);
    return res.status(500).send({
      error: err.message,
    });
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await db.User.find();
    return res.status(200).send({
      users: users,
    });
  } catch (err) {
    return res.status(500).send("error");
  }
}

module.exports = {
  register: register,
  signIn: signIn,
  refreshToken: refreshToken,
  getUsers: getUsers,
};
