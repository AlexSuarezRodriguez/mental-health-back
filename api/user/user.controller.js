const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  createUser,
  updateUser,
} = require('./user.service');

async function handlerGetAllUsers(request, response){
  const users = await getAllUsers();
  response.status(201).json(users);
}

async function handlerGetUserById(request, response){
  const { id } = request.params;
  try {
    const user = await getUserById(id);
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json(error);
  }
}

async function handlerGetUserByEmail(request, response){
  const {email} = request.body;  
  try {
    const user = await getUserByEmail(email);
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json(error);
  }
}

async function handlerCreateUser(request, response) {
  const newUser = request.body;
  try {
    const user = await createUser(newUser);
    response.status(201).json(user);
  } catch (error) {
    response.status(404).json(error);
  }
}

async function handlerUpdateUser(request, response) {
  const { id } = request.params;
  const body = request.body;
  try{
    const updatedUser = await updateUser(id, body);
    response.status(201).json(updatedUser);
  } catch (error) {
    response.status(500).json(error);
  }
}

async function handlerDeleteUser(request, response) {
  const { id } = request.params;
  try {
    const deletedUser = await deleteUser(id);
    response.status(201).json(deletedUser);
  } catch (error) {
    response.status(404).json(error);
  }
}

module.exports = {
  handlerGetAllUsers,
  handlerGetUserById,
  handlerGetUserByEmail,
  handlerCreateUser,
  handlerUpdateUser,
  handlerDeleteUser,
}