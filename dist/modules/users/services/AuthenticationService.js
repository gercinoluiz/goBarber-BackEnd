"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUserRepository = _interopRequireDefault(require("../repositories/IUserRepository"));

var _tsyringe = require("tsyringe");

var _IHashProvider = _interopRequireDefault(require("../providers/HashProviders/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticationService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("HashProvider")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("USersRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default, typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class AuthenticationService {
  constructor(hashProvider, userRepository) {
    this.hashProvider = hashProvider;
    this.userRepository = userRepository;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.userRepository.findByEmail(email); // It didint get it coreect at first because I didint search email as an DTO

    if (!(user !== null && user !== void 0 && user.email)) throw new _AppError.default("Email or password does not match any result", 401); // exclamation mark says it might be undefined

    const compareMatched = await this.hashProvider.compareHash(password, user.password); // The code bellow return a true or false

    if (!compareMatched) {
      throw new _AppError.default("Email or password does not match any result", 401);
    }

    const {
      secret
    } = _auth.default.jwt;

    if (!secret) {
      throw new _AppError.default('Secret is wrong');
    } // I am creating the token


    const token = (0, _jsonwebtoken.sign)({}, secret, {
      subject: user.id,
      expiresIn: _auth.default.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = AuthenticationService;
exports.default = _default;