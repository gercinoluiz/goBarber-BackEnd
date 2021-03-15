"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Appointment = _interopRequireDefault(require("../../infra/typeorm/entities/Appointment"));

var _uuidv = require("uuidv4");

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// interface CreateAppointmentDTO {
//     provider: string;
//     date: Date;
// }
class AppointmentRepository {
  constructor() {
    this.appointments = [];
  }

  async findByDate(date, provider_id) {
    const findAppointment = this.appointments.find(appointment => (0, _dateFns.isEqual)(appointment.date, date) && appointment.provider_id == provider_id);
    return findAppointment;
  }

  async create({
    date,
    provider_id,
    user_id
  }) {
    const appointment = new _Appointment.default();
    Object.assign(appointment, {
      id: (0, _uuidv.uuid)(),
      date: date,
      provider_id: provider_id,
      user_id
    });
    this.appointments.push(appointment);
    return appointment;
  }

  async findAllInMonthFromProvider({
    month,
    provider_id,
    year
  }) {
    const appointments = this.appointments.filter(appointment => appointment.provider_id === provider_id && (0, _dateFns.getMonth)(appointment.date) + 1 === month && (0, _dateFns.getYear)(appointment.date) === year);
    return appointments;
  }

  async findAllInDayFromProvider({
    day,
    month,
    provider_id,
    year
  }) {
    const appointments = this.appointments.filter(appointment => appointment.provider_id === provider_id && (0, _dateFns.getDate)(appointment.date) === day && (0, _dateFns.getMonth)(appointment.date) + 1 === month && (0, _dateFns.getYear)(appointment.date) === year);
    return appointments;
  }

}

var _default = AppointmentRepository;
exports.default = _default;