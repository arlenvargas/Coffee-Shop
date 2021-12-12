module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    user: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
  });
  return Order;
};
