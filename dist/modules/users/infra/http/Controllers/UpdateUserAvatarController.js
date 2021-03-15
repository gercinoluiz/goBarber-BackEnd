"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateUserAvatarController {
  async update(request, response) {
    const uploadAvatar = _tsyringe.container.resolve(_UpdateUserAvatarService.default);

    const user = await uploadAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    }); // const { password, ...responseUser } = user // Thats awesme!! I can remove any field that I dont whatn to show I took out the password field and the rest of them

    return response.status(200).json((0, _classTransformer.classToClass)(user));
    return response.json({
      ok: true
    });
  }

}

exports.default = UpdateUserAvatarController;