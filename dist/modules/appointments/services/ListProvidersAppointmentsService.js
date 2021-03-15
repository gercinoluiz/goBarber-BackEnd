"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CaheProvider/models/ICacheProvider"));

var _classTransformer = require("class-transformer");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderAppointmentsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListProviderAppointmentsService {
  constructor(appointmentRepository, cacheProvider) {
    this.appointmentRepository = appointmentRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    day,
    month,
    provider_id,
    year
  }) {
    console.log('@DevLog/LisProvidersAppointmentService/execute');
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
    let appointments = await this.cacheProvider.recover(cacheKey);

    if (!appointments) {
      console.log("@DevLog - DataBase ==> Nothing found in Redis PostGress");
      console.log("@DevLog - DataBase ==> Querying PostGress");
      appointments = await this.appointmentRepository.findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year
      });
    }

    await this.cacheProvider.save(cacheKey, (0, _classTransformer.classToClass)(appointments));
    return appointments;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListProviderAppointmentsService;