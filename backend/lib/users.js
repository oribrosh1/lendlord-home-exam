const UsersRepo = require('../repository/users');

class Users {
  constructor() {
    this.repo = null;
  }

  async initialize() {
    this.repo = new UsersRepo();
  }

  async findUser(query, projection = {}) {
    return await this.repo.findOne(query, projection);
  }

  async findAllUsers(query = {}, projection = {}) {
    return await this.repo.findAll(query, projection);
  }

  async findAllManagers(query = {}, projection = {}) {
    return await this.repo.findAllManagers(query, projection);
  }


  async createUser(userData) {
    return await this.repo.insert(userData);
  }

  async updateUser(query, updateData) {
    return await this.repo.update(query, updateData);
  }

  async deleteUser(query) {
    return await this.repo.delete(query);
  }

  async getManagerAndEmployees(managerId) {
    return await this.repo.getManagerAndEmployees(managerId);
  }
}

module.exports = Users;
