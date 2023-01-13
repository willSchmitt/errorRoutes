const {hash} = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite")
  
class UsersController {
async create (request, response) {
  const { name, email, password } = request.body;

  const database = await sqliteConnection();

  const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

  if(checkUserExists) {
    throw new AppError("Este email já está em uso.")
  }

  const hashedPassword = await hash(password, 8)

  await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

  return response.status(201).json();
  }


  async update (request, response) {
    const {name, email} = request.body;
    const {id} = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

    if(!user) {
      throw new Error("Usuário não encontrado.")
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new Error("Este email já em uso.")
    }

    user.name = name;
    user.email = email;

    await database.run(
      `UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now'),
      WHERE id = ?`

      [user.name, user.email, user.password, new Date(), id]
    );

    return response.status(200).json();

}}

module.exports = UsersController;

/* 5 TIPOS(métodos) DE CONTROLLERS
  * index - GET para listar varios registros
  * show - GET para exibir um registro especifico
  * create - POST criar um registro
  * update - PUT para atualizar um registro
  * delete - DELETE para remover um registro
*/
