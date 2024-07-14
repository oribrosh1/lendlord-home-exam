const { ObjectId } = require('mongodb')
const Users = require('../lib/users')
const { USER_ROLES } = require('../constants')
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
 * Gets all managers
 */
exports.getAllManagers = async ctx => {
  try {
    const managersList = await users.findAllManagers();

    ctx.status = 200;
    ctx.body = managersList;
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
    const data = {
      salary: Number(ctx.request.body.salary),
      dateStarted: new Date(ctx.request.body.dateStarted),
      email: ctx.request.body.email,
      firstName: ctx.request.body.firstName,
      lastName: ctx.request.body.lastName,
      role: ctx.request.body.role,
      manager: ctx.request.body.manager?._id ?? null
    }
    let err = ''
    if (!data.salary || (data.salary && data.salary <= 0)) {
      ctx.status = err.status || 500
      err += 'add valid salary\n'
    }
    if (!data.dateStarted) {
      ctx.status = err.status || 500
      err += 'add valid stared date \n'
    }
    if (!data.firstName || (data.firstName && data.firstName === '')) {
      ctx.status = err.status || 500
      err += 'add valid first name \n'
    }
    if (!data.lastName || (data.lastName && data.lastName === '')) {
      ctx.status = err.status || 500
      err += 'add valid last name \n'
    }
    if (!data.role || (data.role && !Object.values(USER_ROLES).includes(data.role))) {
      ctx.status = err.status || 500
      err += 'add valid role \n'
    }

    // if no error then add the user
    if (err === '') {
      const newUser = await users.createUser(data);
      ctx.status = 201;
      ctx.body = newUser
    }
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