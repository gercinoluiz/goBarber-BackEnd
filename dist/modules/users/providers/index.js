"use strict";

var _tsyringe = require("tsyringe");

var _BcryptProvider = _interopRequireDefault(require("./HashProviders/implementations/BcryptProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('HashProvider', _BcryptProvider.default);