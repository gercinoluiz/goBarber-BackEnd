import FakeAppointmentsRepository from "@modules/appointments/repositories/fakes/FakeAppointmentsRepository"
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService"
import AppError from "@shared/errors/AppError";
import FakeNotificationsRepository from '../../notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '../../../shared/container/providers/CaheProvider/fakes/FakeCashProvider';


let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let createAppointment: CreateAppointmentService
let fakeCaheProvider: FakeCacheProvider

describe('Creat Appointment', () => {

    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCaheProvider)
    })

    it('should be able to create a new appointment', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        });
      

        const appointment = await createAppointment.execute({
            date: new Date(2021, 4, 10, 13),
            provider_id: '123654',
            user_id: '1234567'
        })

        expect(appointment).toHaveProperty('id')
        expect(appointment.provider_id).toBe('123654')
    })

    it('should not be able to create appointments at the same time', async () => {


        const appointmentDate = new Date(2021, 4, 10, 11)

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123456',
            user_id: '1234567'
        })


        expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: '123456',
            user_id: '1234567'
        })
        ).rejects.toBeInstanceOf(Error)

    })

    it('shoul not be able to create an appointment on a paste date', async () => {

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2021, 4, 10, 11),
            provider_id: 'provider-id',
            user_id: 'user-id',
        })).rejects.toBeInstanceOf(Error)



    })

    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 11, 7),
                provider_id: 'user-id',
                user_id: 'provider-id',
            }),
        ).rejects.toBeInstanceOf(Error);

        await expect(
            createAppointment.execute({
                date: new Date(2021, 4, 11, 18),
                provider_id: 'user-id',
                user_id: 'provider-id',
            }),
        ).rejects.toBeInstanceOf(Error);
    })
})
