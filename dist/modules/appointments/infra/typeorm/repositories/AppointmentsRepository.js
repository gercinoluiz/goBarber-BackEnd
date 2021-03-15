"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Appointment = _interopRequireDefault(require("../entities/Appointment"));

var _typeorm = require("typeorm");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// interface CreateAppointmentDTO {
//     provider: string;
//     date: Date;
// }
class AppointmentRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Appointment.default);
  }

  async findByDate(date, provider_id) {
    // const findAppointmentByDate = this.appointments.find(appointment => {
    //     isEqual(date, appointment.date)
    // })
    const findAppointmentByDate = await this.ormRepository.findOne({
      where: {
        date,
        provider_id
      }
    });
    return findAppointmentByDate || undefined;
  }

  async create({
    date,
    provider_id,
    user_id
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      date,
      user_id
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  async findAllInMonthFromProvider({
    month,
    provider_id,
    year
  }) {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      },
      relations: ['user']
    });
    return appointments;
  }

  async findAllInDayFromProvider({
    day,
    month,
    provider_id,
    year
  }) {
    const parseDay = String(day).padStart(2, '0');
    const parseMonth = String(month).padStart(2, '0');
    const appoitment = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`)
      },
      relations: ['user']
    });
    return appoitment;
  }

}

var _default = AppointmentRepository;
exports.default = _default;