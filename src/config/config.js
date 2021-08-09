const dotenv = require("dotenv");

dotenv.config();

const {
  NODE_ENV = "development",
  MONGO_DB_URL_PRODUCTION,
  MONGO_DB_URL_DEVELOPMENT,
  MONGO_DB_URL_TEST,
  ACCESS_TOKEN_SECRET,
  PORT,
  ENCRYPTION_SALT_DEVELOPMENT,
  ENCRYPTION_SALT_PRODUCTION,
} = process.env;

// const ENV = NODE_ENV || "development";

const CONFIG = {
  production: {
    app: {
      PORT: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
    auth: {
      secret: ACCESS_TOKEN_SECRET,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_PRODUCTION,
    },
  },
  development: {
    app: {
      PORT: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
    auth: {
      secret: ACCESS_TOKEN_SECRET,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT,
    },
  },
  test: {
    app: {
      PORT: PORT || 4000,
    },
    db: {
      url: MONGO_DB_URL_TEST,
    },
    auth: {
      secret: ACCESS_TOKEN_SECRET,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT,
    },
  },
};

module.exports = {
  config: CONFIG[NODE_ENV],
};
