
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProvidersService from '../../users/services/ListProvidersService';
import ListProviderAppointmentsService from './ListProvidersAppointmentsService';
import { da } from 'date-fns/locale';
import FakeCacheProvider from '../../../shared/container/providers/CaheProvider/fakes/FakeCashProvider';



let appointmentRepository: FakeAppointmentsRepository
let listProviderAppointmentsService: ListProviderAppointmentsService
let fakeCacheProvider: FakeCacheProvider;


describe('List Appointments', () => {

    beforeEach(() => {

        appointmentRepository = new FakeAppointmentsRepository()
        listProviderAppointmentsService = new ListProviderAppointmentsService(appointmentRepository, fakeCacheProvider)

    })

    it('should be able to list all appointments0', async () => {

        const appointment01 = await appointmentRepository.create({
            provider_id: `123456`,
            date: new Date(2021, 4, 10, 15, 20),
            user_id: '654321'
        })


        const appointment02 = await appointmentRepository.create({
            provider_id: `123456`,
            date: new Date(2021, 4, 10, 16, 20),
            user_id: '654321'
        })


        const appointments = await listProviderAppointmentsService.execute({
            year: 2021,
            month: 5,
            day: 10,
            provider_id: '123456'
        })


        expect(appointments).toEqual([appointment01, appointment02])

    })

})