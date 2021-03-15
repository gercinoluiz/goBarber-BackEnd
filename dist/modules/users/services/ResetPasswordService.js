"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepository = _interopRequireDefault(require("../repositories/IUserRepository"));

var _IUserTokensRepository = _interopRequireDefault(require("../repositories/IUserTokensRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProviders/models/IHashProvider"));

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ResetPassowrdService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('USersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _IUserTokensRepository.default === "undefined" ? Object : _IUserTokensRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ResetPassowrdService {
  constructor(userRepository, usersTokenRepository, hashProvider) {
    this.userRepository = userRepository;
    this.usersTokenRepository = usersTokenRepository;
    this.hashProvider = hashProvider;
  }

  async execute({
    token,
    password
  }) {
    const userToken = await this.usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new Error('token does not exists');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new Error('user does not exist');
    }

    const tokenDate = userToken.created_at;
    const compareDate = (0, _dateFns.addHours)(tokenDate, 2);

    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _AppError.default('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.userRepository.save(user);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = ResetPassowrdService;