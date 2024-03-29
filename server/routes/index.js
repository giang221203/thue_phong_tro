const {
  errHandler,
  badRequestException,
} = require("../middlewares/errorHandle");
const auth = require("./auth");
const user = require("./user");
const insert = require("./insert");
const propertyType = require("./propertyType");

const initRoutes = (app) => {
  app.use("/api/insert", insert);
  app.use("/api/auth", auth);
  app.use("/api/user", user);
  app.use("/api/property-type", propertyType);

  app.use(badRequestException);
  app.use(errHandler);
};

module.exports = initRoutes;
