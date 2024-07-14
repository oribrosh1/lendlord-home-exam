const { ObjectId } = require('mongodb')
const Users = require('../lib/users')
const users = new Users()

/**
 * Gets user by id
 */
exports.getUserById = async ctx => {
  const { id } = ctx.params
  try {
    const user = await users.findUser({ _id: new ObjectId(id) })

    ctx.status = 200
    ctx.body = user
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}

/**
 * Gets all users - returns an array of users
 */
exports.getAllUsers = async ctx => {
  try {
    const usersList = await users.findAllUsers();

    ctx.status = 200;
    ctx.body = usersList;
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message || 'Internal server error' };
  }
}

/**
 * Create user
 */
exports.createUser = async ctx => {
  try {
    const newUser = await users.createUser(ctx.request.body);

    ctx.status = 201;
    ctx.body = newUser
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}

/**
 * Update user
 */
exports.updateUser = async ctx => {
  const { id } = ctx.params
  try {
    const updatedUser = await users.updateUser({ _id: new ObjectId(id) }, ctx.request.body);

    ctx.status = 200
    ctx.body = updatedUser
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}

/**
 * Delete user
 */
exports.deleteUser = async ctx => {
  const { id } = ctx.params
  try {
    await users.deleteUser({ _id: new ObjectId(id) });

    ctx.status = 204
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}

/**
 * Gets a user manager and their user employees - returns a manager object with an array of his employees
 */
exports.getManagerAndEmployees = async ctx => {
  const { managerId } = ctx.params;
  try {
    const result = await users.getManagerAndEmployees(managerId);

    ctx.status = 200;
    ctx.body = result;
  } catch (err) {
    ctx.status = err.status || 500
    ctx.message = err.message || 'Internal server error'
  }
}

async function initialize() {
  await users.initialize();
}

initialize()