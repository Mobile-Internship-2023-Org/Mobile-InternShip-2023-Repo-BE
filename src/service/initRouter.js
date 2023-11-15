const express = require("express");
const router = express.Router();
const userController = require("../controller/uercontroller");

const initRouter = (app) => {
  router.get("/user", userController.getUser);

  return app.use("/", router);
};

export default initRouter;
