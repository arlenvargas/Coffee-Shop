const db = require("./app/models");
const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: false });

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to coffee shop application" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

require("./app/routes/ProductRoutes")(app);
require("./app/routes/OrderRoutes")(app);
