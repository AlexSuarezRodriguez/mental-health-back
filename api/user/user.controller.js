const {
  getAllUsers,
  getOneUser,
  deleteUser,
  createUser,
  updateUser,
} = require('./user.service');

async function handlerAllUsers(request, response){
  const users = await getAllUsers();
  response.json(users);
}

async function handlerGetOneUser(request, response){
  const { id } = request.params;
  const user = await getOneUser(id);
  if (!user) {
    response.status(404).json({message: `El usuario no existe`});
  } else {
    response.json(user);
  }
}

async function handlerCreateUser(request, response) {
  const { body } = request;
  const newUser = await createUser(body);
  response.json(newUser);
}

async function handlerUpdateUser(request, response) {
  const { id } = request.params;
  const { body } = request;
  const updatedUser = await updateUser(id, body);
  if (!updatedUser) {
    response.status(404).json({message: `El usuario no existe`});
  } else {
    response.json(updatedUser);
  }
}

async function handlerDeleteUser(request, response) {
  const { id } = request.params;
  const deletedUser = await deleteUser(id);
  if (!deletedUser) {
    response.status(404).json({message: `El usuario no existe`});
  } else {
    response.json({message: `El usuario ha sido borrado`}).json(deletedUser);
  }
}

module.exports = {
  handlerAllUsers,
  handlerGetOneUser,
  handlerCreateUser,
  handlerUpdateUser,
  handlerDeleteUser,
}