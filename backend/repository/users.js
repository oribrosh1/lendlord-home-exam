const usersModel = require('../models/users')

class Users {
  async findOne(query, projection = {}) {
    return await usersModel.findOne(query).select(projection).populate('manager');
  }

  async findAll(query = {}, projection = {}) {
    return await usersModel.find(query).select(projection).populate('manager');
  }

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