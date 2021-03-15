"use strict";

var _RedisCacheProvider = _interopRequireDefault(require("./implementations/RedisCacheProvider"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  redis: _RedisCacheProvider.default
};

_tsyringe.container.registerSingleton('CacheProvider', providers.redis);