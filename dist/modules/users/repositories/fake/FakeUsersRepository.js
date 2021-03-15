"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

var _uuidv = require("uuidv4");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUserRepository {
  constructor() {
    this.users = [];
  }

  async findByEmail(email) {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  async findById(id) {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  async create(data) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuidv.uuid)()
    }, data);
    this.users.push(user);
    return user;
  }

  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

  async findlAllproviders({
    exept_user_id
  }) {
    let {
      users
    } = this;

    if (exept_user_id) {
      users = this.users.filter(user => user.id !== exept_user_id);
    }

    return users;
  }

}

var _default = FakeUserRepository;
exports.default = _default;