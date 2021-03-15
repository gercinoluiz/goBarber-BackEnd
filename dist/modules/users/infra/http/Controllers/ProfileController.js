"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ShowProfileService = _interopRequireDefault(require("../../../services/ShowProfileService"));

var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileController {
  async show(request, response) {
    const user_id = request.user.id;

    const showProfile = _tsyringe.container.resolve(_ShowProfileService.default);

    const user = await showProfile.execute({
      user_id
    });
    const userWithOutPAssword = (0, _classTransformer.classToClass)(user);
    return response.json(userWithOutPAssword);
  }

  async update(request, response) {
    console.log('@DevLog ==> /ProfileControler/update');
    const user_id = request.user.id;
    console.log('user_Id', user_id);
    const {
      name,
      email,
      old_password,
      password
    } = request.body;

    const updateProfile = _tsyringe.container.resolve(_UpdateProfileService.default);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password
    });
    const userWithOutPAssword = (0, _classTransformer.classToClass)(user);
    console.log({
      userWithOutPAssword,
      user
    });
    return response.json(userWithOutPAssword);
  }

}

exports.default = ProfileController;