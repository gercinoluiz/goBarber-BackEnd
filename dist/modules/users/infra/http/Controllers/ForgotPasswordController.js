"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SendEmailProviderService = _interopRequireDefault(require("../../../services/SendEmailProviderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ForgotPasswordController {
  async create(request, response) {
    const {
      email
    } = request.body;

    const sendForgotPasswordMail = _tsyringe.container.resolve(_SendEmailProviderService.default);

    await sendForgotPasswordMail.execute({
      email
    });
    return response.status(204).json();
  }

}

exports.default = ForgotPasswordController;