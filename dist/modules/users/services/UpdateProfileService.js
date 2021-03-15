"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../repositories/IUserRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProviders/models/IHashProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateProfileService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('USersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateProfileService {
  constructor(usersRepository, hashProvider) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    user_id,
    name,
    email,
    old_password,
    password
  }) {
    console.log('/UpdateProfileService/execute');
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('No user found with the due id');
    }

    const isEmailRepeated = await this.usersRepository.findByEmail(email);
    console.log({
      isEmailRepeated: isEmailRepeated === null || isEmailRepeated === void 0 ? void 0 : isEmailRepeated.id,
      user: user.id
    });

    if (isEmailRepeated && isEmailRepeated.id !== user.id) {
      throw new _AppError.default('Email already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new _AppError.default('You gotta inform the old password');
    }

    console.log({
      old_password
    });

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);

      if (!checkOldPassword) {
        throw new _AppError.default('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    console.log({
      user
    });
    return this.usersRepository.save(user);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateProfileService;