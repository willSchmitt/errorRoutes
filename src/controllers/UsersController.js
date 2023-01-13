const AppError = require("../utils/AppError");

class UsersController {
 create (request, response) {
  const { name, email, password } = request.body;

  if (!name) {
    throw new AppError("O nome é obrigatório");
  }

  response.status(201).json({name, email, password});
 }

}

module.exports = UsersController;

/* 5 TIPOS(métodos) DE CONTROLLERS
  * index - GET para listar varios registros
  * show - GET para exibir um registro especifico
  * create - POST criar um registro
  * update - PUT para atualizar um registro
  * delete - DELETE para remover um registro
*/
