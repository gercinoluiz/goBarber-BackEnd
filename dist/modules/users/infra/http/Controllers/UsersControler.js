"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UserRepository = _interopRequireDefault(require("../../typeorm/repositories/UserRepository"));

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const userRepository = new _UserRepository.default();

    try {
      const {
        name,
        password,
        email
      } = request.body;

      const createUser = _tsyringe.container.resolve(_CreateUserService.default);

      const user = await createUser.execute({
        name,
        email,
        password
      }); // I had to pass it as a DTO (data transfer object)
      //  delete user.password;

      return response.json((0, _classTransformer.classToClass)(user));
    } catch (error) {
      return response.status(400).json({
        error: error.message
      });
    }
  }

}

exports.default = UsersController;