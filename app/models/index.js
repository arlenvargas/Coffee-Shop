const dbConfig = require("../db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./ProductModel")(sequelize, Sequelize);
db.orders = require("./OrderModel")(sequelize, Sequelize);
db.order_product = require("./Order_Product")(sequelize, Sequelize);

db.orders.belongsToMany(db.products, {
  foreignKey: "orderId",
  through: "order_product",
});
db.products.belongsToMany(db.orders, {
  foreignKey: "productId",
  through: "order_product",
});

module.exports = db;
