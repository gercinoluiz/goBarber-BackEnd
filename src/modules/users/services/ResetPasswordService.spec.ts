import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from "@modules/users/repositories/fake/FakeUsersRepository"
import SendForgotPasswordEmailService from './SendEmailProviderService';
import FakeUserTokensRepository from '../repositories/fake/FakeUserTokensRepository';
import ResetPassowrdService from '@modules/users/services/ResetPasswordService'
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fake/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository
let resetPassowrdService: ResetPassowrdService
let fakeHashProvider: FakeHashProvider

describe('Reset Password', () => {



    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();
        resetPassowrdService = new ResetPassowrdService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeHashProvider
        );

    });

    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({

            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });
        

        const { token } = await fakeUserTokensRepository.generate(user.id);
        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

        await resetPassowrdService.execute({
            password: '123123',
            token,
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123')
        expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able to reset the password with a non-existing-user', async () => {

        const { token } = await fakeUserTokensRepository.generate('non-existing-user')

        await expect(
            resetPassowrdService.execute({
                password: '123456',
                token
            })
        ).rejects.toBeInstanceOf(Error)

    })

    it('should not be able to reset a password after two hours', async () => {

        const user = await fakeUsersRepository.create({
            name: 'Jon Doe',
            password: '123456',
            email: 'jondoe@example.com'
        })

        const { token } = await fakeUserTokensRepository.generate(user.id)

        // I am changing the date to be sent to the service with three more hours
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {

            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3)
        })

        await expect(resetPassowrdService.execute({
            password: '123456',
            token
        })).rejects.toBeInstanceOf(Error)

    })
});
