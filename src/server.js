require("express-async-errors");

const AppError = require("./utils/AppError");
const express = require('express');

const routes = require('./routes');

// const { get } = require('express/lib/response');
const { response } = require("express");

const app = express();
app.use((error, request, response, next) => {  // Usado para conectar o insomnia com o vscode
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))