
import FakeUserRepository from '../repositories/fake/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProviders/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import AppError from '../../../shared/errors/AppError';


let fakeUsersRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let updadeProfileService: UpdateProfileService

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();


        updadeProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)
    })

    it('should be able to update the user profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jon Doe',
            email: 'jondoe@example.com',
            password: '123456',
        })


        const updatedUser = await updadeProfileService.execute({
            user_id: user.id,
            email: 'jontre@example.com',
            name: "Jon Trê"
        })


        expect(updatedUser.name).toBe('Jon Trê')
        expect(updatedUser.email).toBe('jontre@example.com')


    })

    it('shoud not be able to change its email to an used one', async () => {

        await fakeUsersRepository.create({
            name: 'Jon Doe',
            email: 'jondoe@example.com',
            password: '123456',
        })


        const user = await fakeUsersRepository.create({
            email: 'test@example.com',
            name: "Test",
            password: '123456'
        })


        await expect(updadeProfileService.execute({
            user_id: user.id,
            name: 'Jon Doe',
            email: 'jondoe@example.com'
        })).rejects.toBeInstanceOf(Error)

    })


    it('should be able to update the password', async () => {


        const user = await fakeUsersRepository.create({
            name: 'Jon Doe',
            email: 'jondoe@example.com',
            password: '123456',
        })

        const updatedUser = await updadeProfileService.execute({
            user_id: user.id,
            email: user.email,
            old_password: '123456',
            password: '654321',
            name:'Jon Doe'
        })

        expect(updatedUser.password).toBe('654321')

    })

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        });

        await expect(
            updadeProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            password: '123123',
          }),
        ).rejects.toBeInstanceOf(Error);
      });

      it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        });

        await expect(
            updadeProfileService.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            old_password: 'wrong-old-password',
            password: '123123',
          }),
        ).rejects.toBeInstanceOf(Error);
      });
    });


