const db = require("../models");

async function register(req, res, next) {
  const { name, surname, email, password } = req.body;

  try {
    //const encryptedPassword = encryptString(password);

    const { _id } = await db.User.create({
      name: name,
      surname: surname,
      email: email,
      password: password,
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

async function signIn(req, res, next) {}

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
  getUsers: getUsers,
};
