"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../entities/User"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async findByEmail(email) {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async findById(id) {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  async create(data) {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  async save(user) {
    return await this.ormRepository.save(user);
  }

  async findlAllproviders({
    exept_user_id
  }) {
    let users;

    if (exept_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: (0, _typeorm.Not)(exept_user_id)
        }
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

}

var _default = UserRepository;
exports.default = _default;