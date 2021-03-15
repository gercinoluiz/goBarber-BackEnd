"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProvidersAppointmentsService = _interopRequireDefault(require("./ListProvidersAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let appointmentRepository;
let listProviderAppointmentsService;
let fakeCacheProvider;
describe('List Appointments', () => {
  beforeEach(() => {
    appointmentRepository = new _FakeAppointmentsRepository.default();
    listProviderAppointmentsService = new _ListProvidersAppointmentsService.default(appointmentRepository, fakeCacheProvider);
  });
  it('should be able to list all appointments0', async () => {
    const appointment01 = await appointmentRepository.create({
      provider_id: `123456`,
      date: new Date(2021, 4, 10, 15, 20),
      user_id: '654321'
    });
    const appointment02 = await appointmentRepository.create({
      provider_id: `123456`,
      date: new Date(2021, 4, 10, 16, 20),
      user_id: '654321'
    });
    const appointments = await listProviderAppointmentsService.execute({
      year: 2021,
      month: 5,
      day: 10,
      provider_id: '123456'
    });
    expect(appointments).toEqual([appointment01, appointment02]);
  });
});