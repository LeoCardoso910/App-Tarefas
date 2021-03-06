const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

module.exports = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(morgan("dev"));
};
