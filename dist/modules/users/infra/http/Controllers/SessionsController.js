"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthenticationService = _interopRequireDefault(require("../../../services/AuthenticationService"));

var _UserRepository = _interopRequireDefault(require("../../typeorm/repositories/UserRepository"));

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    console.log("SessionsController/create");
    const userRepository = new _UserRepository.default();
    const {
      password,
      email
    } = request.body;

    const AuthUser = _tsyringe.container.resolve(_AuthenticationService.default);

    let {
      user,
      token
    } = await AuthUser.execute({
      password,
      email
    }); // it refator my response

    user = (0, _classTransformer.classToClass)(user);
    return response.json({
      user,
      token
    });
  }

}

exports.default = SessionsController;