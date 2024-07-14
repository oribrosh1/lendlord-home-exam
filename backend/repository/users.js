const { USER_ROLES } = require('../constants');
const usersModel = require('../models/users')

class Users {
  async findOne(query, projection = {}) {
    return await usersModel.findOne(query).select(projection).populate({
      path: 'manager',
      select: '_id firstName lastName'
    });
  }

  async findAll(query = {}, projection = {}) {
    return await usersModel.find(query).select(projection).populate({
      path: 'manager',
      select: '_id firstName lastName'
    });
  }
  async findAllManagers(query = { role: USER_ROLES.MANAGER }, projection = {}) {
    return await usersModel.find(query).select(projection).populate({
      path: 'manager',
      select: '_id firstName lastName'
    });
  }


  // parsing the userData
  async insert(userData) {
    const newUser = new usersModel(userData);
    return await newUser.save();
  }



  async update(query, updateData) {
    return await usersModel.updateOne(query, { $set: updateData }, { new: true });
  }

  async delete(query) {
    return await usersModel.deleteOne(query);
  }

  async getManagerAndEmployees(managerId) {
    const manager = await this.findOne({ _id: managerId });
    const employees = await this.findAll({ manager: managerId });
    return { manager, employees };
  }
}

module.exports = Users