"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthetications = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthetications"));

var _AppointmentsController = _interopRequireDefault(require("../Controllers/AppointmentsController"));

var _ProvidersAppointmentsController = _interopRequireDefault(require("../Controllers/ProvidersAppointmentsController"));

var _reqChecker = _interopRequireDefault(require("../../../../../shared/infra/http/celebrate/reqChecker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appointmentRouter = (0, _express.Router)();
const appointmentController = new _AppointmentsController.default();
const providersAppointmentsController = new _ProvidersAppointmentsController.default();
// MiddleWare for authentication: The way I am using bellow I whant to express that every thing on this file will have it as middleware
appointmentRouter.use(_ensureAuthetications.default);
appointmentRouter.post("/", _reqChecker.default.createAppointment, appointmentController.create);
appointmentRouter.get("/me", providersAppointmentsController.index);
var _default = appointmentRouter;
exports.default = _default;