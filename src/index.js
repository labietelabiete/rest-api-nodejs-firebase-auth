const app = require("./server");
const { config } = require("./config");
const connect = require("./db/connect");

connect().then(async () => {
  app.listen(config.app.PORT, () => {
    console.log(`Server running at port ${config.app.PORT}`);
  });
});
