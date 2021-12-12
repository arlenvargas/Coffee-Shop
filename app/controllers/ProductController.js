const db = require("../models");
const Product = db.products;

exports.create = async (req, res) => {
  try {
    if (!req.body.name || !req.body.price) {
      res.status(400).send({
        message: "El nombre y precio son requeridos",
      });
    }
    const product = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
    };
    const response = await Product.create(product);
    res.send(response);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the product.",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.send(response);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the product.",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const productSearched = await Product.findByPk(id);
    if (!productSearched) {
      res.status(404).send({
        message: `Cannot find Tutorial with id=${id}.`,
      });
    }
    res.send(productSearched);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error retrieving Tutorial with id=${id}`,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Product.update(req.body, {
      where: { id: id },
    });
    res.send(response);
  } catch (error) {
    res.status(500).send({
      message: error.message || `Error updatingWutorial with id=${id}`,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.destroy({
      where: { id: id },
    });
    res.send({
      message: "Tutorial was deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || `Could not delete Tutorial with id=${id}`,
    });
  }
};
