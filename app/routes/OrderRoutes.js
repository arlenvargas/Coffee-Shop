module.exports = (app) => {
  const orders = require("../controllers/OrderController");

  const router = require("express").Router();

  // router.get("/", orders.findAll);
  router.post("/", orders.create);
  router.patch("/:id", orders.updateStatus);
  router.get("/", orders.findAll);

  app.use("/api/orders", router);
};
