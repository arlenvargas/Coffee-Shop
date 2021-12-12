const { products } = require("../models");
const db = require("../models");
const Order = db.orders;
const orderProduct = db.order_product;

exports.create = async (req, res) => {
  try {
    const { items = [] } = req.body;
    const response = await Order.create({
      user: req.body.user,
      state: req.body.state,
    });
    items.forEach(async (item) => {
      await orderProduct.create({
        orderId: response.id,
        productId: item.productId,
        quantity: item.quantity,
      });
    });
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message || "Some error occurred while creating the orders",
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Order.update(
      { state: req?.body?.state },
      {
        where: { id: id },
      }
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({
      message: error || "Some error occurred while creating the orders",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const response = await Order.findAll({
      include: [
        {
          model: products,
          as: "products",
          attributes: ["id", "name", "price"],
          through: { attributes: ["quantity"] },
        },
      ],
    });
    res.send({ items: response });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while getting the orders.",
    });
  }
};
