const db = require("../models");
const Product = db.products;

exports.create = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {
    if (!req?.body?.name || !req?.body?.price || !req?.body?.image) {
      res.status(400).send({
        message: "El nombre, precio e imagen son requeridos",
      });
    }
    const product = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
    };
    const response = await Product.create(product, { transaction });
    await transaction.commit();
    res.status(200).send(response);
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({
      message: error.message || "No se pudo crear el producto",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const response = await Product.findAll();
    res.send(response);
  } catch (error) {
    res.status(500).send({
      message: error.message || "No se pudieron recuperar los productos",
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const productSearched = await Product.findByPk(id);
    if (!productSearched) {
      res.status(404).send({
        message: `No se pudo encontrar el producto con el id=${id}.`,
      });
    }
    res.send(productSearched);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        `Ha ocurrido un error al intentar recuperar el producto`,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.update(req.body, {
      where: { id: id },
    });
    res.status(200).send({
      status: 200,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || `Error actualizando el producto con el id=${id}`,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Product.destroy({
      where: { id: id },
    });
    res.status(200).send({
      message: "Producto eliminado correctamente",
      id,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || `No se pudo eliminar el producto con el id=${id}`,
    });
  }
};
