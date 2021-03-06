module.exports = (sequelize, DataTypes) => {
  const Order_Product = sequelize.define("order_product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  });
  Order_Product.associate = (models) => {
    Order_Product.belongsTo(models.orders, {
      foreignKey: "orderId",
    });
  };
  Order_Product.associate = (models) => {
    Order_Product.belongsTo(models.products, {
      foreignKey: "productId",
    });
  };

  return Order_Product;
};
