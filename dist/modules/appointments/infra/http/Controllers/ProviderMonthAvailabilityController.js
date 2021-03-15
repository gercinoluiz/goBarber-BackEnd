"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("../../../services/ListProviderMonthAvailabilityService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderMonthAlailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      day,
      month,
      year
    } = request.query;

    const listProviderMonthAvalability = _tsyringe.container.resolve(_ListProviderMonthAvailabilityService.default);

    const availability = await listProviderMonthAvalability.execute({
      month: Number(month),
      provider_id,
      year: Number(year)
    });
    return response.json(availability);
  }

}

exports.default = ProviderMonthAlailabilityController;