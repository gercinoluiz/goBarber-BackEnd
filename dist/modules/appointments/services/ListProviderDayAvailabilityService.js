"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _tsyringe = require("tsyringe");

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderDayAvailabilityService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _FakeAppointmentsRepository.default === "undefined" ? Object : _FakeAppointmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProviderDayAvailabilityService {
  constructor(appointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute({
    day,
    month,
    provider_id,
    year
  }) {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day
    });
    console.log({
      appointments
    });
    const hourStart = 8;
    const eachHourArray = Array.from({
      length: 10
    }, (_, index) => index + hourStart);
    console.log({
      eachHourArray
    });
    const currentDate = new Date(Date.now());
    const avalability = eachHourArray.map(hour => {
      const hourAppointmentInHour = appointments.find(appointments => (0, _dateFns.getHours)(appointments.date) === hour);
      const compareDate = new Date(year, month - 1, day, hour);
      return {
        hour,
        available: !hourAppointmentInHour && (0, _dateFns.isAfter)(compareDate, currentDate)
      };
    });
    return avalability;
  }

}) || _class) || _class) || _class) || _class);
exports.default = ListProviderDayAvailabilityService;