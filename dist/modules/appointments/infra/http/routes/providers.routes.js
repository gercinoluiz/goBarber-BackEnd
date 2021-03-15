"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ProvidersController = _interopRequireDefault(require("../../../../users/infra/http/Controllers/ProvidersController"));

var _ProviderMonthAvailabilityController = _interopRequireDefault(require("../Controllers/ProviderMonthAvailabilityController"));

var _ProviderDayAvalabilityController = _interopRequireDefault(require("../Controllers/ProviderDayAvalabilityController"));

var _ensureAuthetications = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthetications"));

var _reqChecker = _interopRequireDefault(require("../../../../../shared/infra/http/celebrate/reqChecker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providersRouter = (0, _express.Router)();
const providersController = new _ProvidersController.default();
const providerMonthAvailabilityController = new _ProviderMonthAvailabilityController.default();
const providerDayAvailabilityController = new _ProviderDayAvalabilityController.default();
providersRouter.use(_ensureAuthetications.default);
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', _reqChecker.default.provider_id, providerMonthAvailabilityController.index);
providersRouter.get('/:provider_id/day-availability', _reqChecker.default.provider_id, providerDayAvailabilityController.index);
var _default = providersRouter;
exports.default = _default;