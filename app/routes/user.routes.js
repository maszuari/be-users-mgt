const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.get(
      "/api/users",
      [authJwt.verifyToken],
      controller.userBoard
    );

    app.get(
      "/api/create-first-admin",
      controller.createFirstAdmin
    );

    app.post(
      "/api/create-user",
      [authJwt.verifyToken],
      controller.createUser,
    );

    app.post(
      "/api/create-multiple-users",
      [authJwt.verifyToken],
      controller.createMultipleUsers,
    );
  };