"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUserRepository = _interopRequireDefault(require("../repositories/IUserRepository"));

var _tsyringe = require("tsyringe");

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProviders/models/IStorageProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateUserAvatarService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("USersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserAvatarService {
  constructor(userRepository, storageProvider) {
    this.userRepository = userRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    user_id,
    avatarFileName
  }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('User does not exist!', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);
    user.avatar = fileName;
    await this.userRepository.save(user);
    await this.userRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateUserAvatarService;
exports.default = _default;