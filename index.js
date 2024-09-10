const express = require("express");
const connectDB = require("./app_configs/app_startup");
const app_config = require("./app_configs/app_config");
const app_routes_initiate = require("./app_configs/app_routes_initiate");
const app = express();

require("dotenv").config();

connectDB().then(() => {
  app.listen(5002, () => console.log("Server is running at port 5002/-"));
});

app_routes_initiate(app, app_config);
