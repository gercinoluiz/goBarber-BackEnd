"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IUserRepository = _interopRequireDefault(require("../repositories/IUserRepository"));

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CaheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProvidersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('USersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.default === "undefined" ? Object : _IUserRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListProvidersService {
  constructor(usersRepository, cacheProvider) {
    this.usersRepository = usersRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    user_id
  }) {
    let users = await this.cacheProvider.recover(`providers-list:${user_id}`);

    if (users) {
      console.log('@DevLog-Data Base audit ==> All data are coming from Redis');
    }

    if (!users) {
      console.log('@DevLog-Data Base audit ==> We got nothing in Redis');
      users = await this.usersRepository.findlAllproviders({
        exept_user_id: user_id
      });
      console.log('@DevLog-Data Base audit ==> A query has been done in PostGress');
    }

    await this.cacheProvider.save(`providers-list:${user_id}`, (0, _classTransformer.classToClass)(users));
    return users;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListProvidersService;