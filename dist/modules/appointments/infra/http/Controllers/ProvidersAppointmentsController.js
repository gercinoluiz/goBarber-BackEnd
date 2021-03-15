"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProvidersAppointmentsService = _interopRequireDefault(require("../../../services/ListProvidersAppointmentsService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProvidersAppointmentsController {
  async index(request, response) {
    const provider_id = request.user.id;
    const {
      day,
      year,
      month
    } = request.query;
    console.log('DevLog : /ProvidersAppointmentsController');

    const listProvidersAppointmentsService = _tsyringe.container.resolve(_ListProvidersAppointmentsService.default);

    const appointments = await listProvidersAppointmentsService.execute({
      day: Number(day),
      month: Number(month),
      provider_id,
      year: Number(year)
    });
    return response.status(200).json((0, _classTransformer.classToClass)(appointments));
  }

}

exports.default = ProvidersAppointmentsController;