import FakeHashProvider  from '@modules/users/providers/HashProviders/fakes/FakeHashProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from "@modules/users/repositories/fake/FakeUsersRepository"
import SendForgotPasswordEmailService from './SendEmailProviderService';
import FakeUserTokensRepository from '../repositories/fake/FakeUserTokensRepository';


describe('Forgot e-mail password', () => {

    let fakeUsersRepository: FakeUsersRepository;
    let fakeMailProvider: FakeMailProvider;
    let fakeUserTokensRepository: FakeUserTokensRepository;
    let sendForgotPasswordEmailService: SendForgotPasswordEmailService;
    let fakeHashProvider: FakeHashProvider;


    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository)
    })

    it('should be able to recover the password', async () => {




        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

        await fakeUsersRepository.create({
            name: "Jon Doe",
            email: "jondoe@example.com",
            password: '12345678'
        })

        await sendForgotPasswordEmailService.execute({
            email: "jondoe@example.com"
        })

        expect(sendMail).toHaveBeenCalled()

    })

    it('should not be able to recover a non-existing user password', async () => {
        await expect(sendForgotPasswordEmailService.execute({
            email: 'jondoe@example.com'
        })).rejects.toBeInstanceOf(Error)
    })

    it('should generate a fortot password token', async () => {

        const generate = jest.spyOn(fakeUserTokensRepository, 'generate')

        const user = await fakeUsersRepository.create({
            name: 'Jon Doe',
            email: 'jondoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmailService.execute({
            email: 'jondoe@example.com',
        })

        expect(generate).toHaveBeenCalledWith(user.id)
    })


}
)
