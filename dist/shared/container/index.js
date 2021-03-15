"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _AppointmentsRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));

var _UserRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserRepository"));

var _UserTokenRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokenRepository"));

var _NotificationsRepository = _interopRequireDefault(require("../../modules/notifications/infra/typeorm/repositories/NotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton("AppointmentsRepository", _AppointmentsRepository.default);

_tsyringe.container.registerSingleton("USersRepository", _UserRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokenRepository.default);

_tsyringe.container.registerSingleton('NotificationsRepository', _NotificationsRepository.default);