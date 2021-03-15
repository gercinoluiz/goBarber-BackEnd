"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabilityService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderDayAlailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      day,
      month,
      year
    } = request.query;

    const listProviderDayAvalability = _tsyringe.container.resolve(_ListProviderDayAvailabilityService.default);

    const availability = await listProviderDayAvalability.execute({
      day: Number(day),
      month: Number(month),
      provider_id,
      year: Number(year)
    });
    return response.json(availability);
  }

}

exports.default = ProviderDayAlailabilityController;