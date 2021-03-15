"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ForgotPasswordController = _interopRequireDefault(require("../Controllers/ForgotPasswordController"));

var _ResetPasswordController = _interopRequireDefault(require("../Controllers/ResetPasswordController"));

var _reqChecker = _interopRequireDefault(require("../../../../../shared/infra/http/celebrate/reqChecker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordRouter = (0, _express.Router)();
const forgotPasswordController = new _ForgotPasswordController.default();
const resetPasswordController = new _ResetPasswordController.default();
passwordRouter.post('/forgot', _reqChecker.default.email, forgotPasswordController.create);
passwordRouter.post('/reset', _reqChecker.default.resetPassword, resetPasswordController.create);
var _default = passwordRouter;
exports.default = _default;