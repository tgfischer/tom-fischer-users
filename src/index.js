const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const middleware = require("tom-fischer-middleware");

const login = require("./routes/login");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/login", login);
app.use(middleware.errorHandler);

module.exports.handler = serverless(app);
