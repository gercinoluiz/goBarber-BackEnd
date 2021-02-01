import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository'
import AuthenticationService from "@modules/users/services/AuthenticationService"
import CreateUserService from './CreateUserService'
import FakeHashProvider from "@modules/users/providers/HashProviders/fakes/FakeHashProvider"
import AppError from '@shared/errors/AppError'

describe('Authenticate', () => {

    it('should be able to authenticate', async () => {

        const fakeRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()

        const createUser = new CreateUserService(fakeRepository, fakeHashProvider)

        const authenticateUser = new AuthenticationService(fakeRepository, fakeHashProvider)

        const newUser = await createUser.execute({
            email: 'jhondoe@example.com',
            name: 'Jhon Doe',
            password: '123456'
        })
        const response = await authenticateUser.execute({
            email: 'jhondoe@example.com',
            password: '123456'
        })

        expect(response).toHaveProperty('token')
        expect(response.user).toEqual(newUser)

    })



    it('should not be able to authenticate with a non existing wuser', async () => {

        const fakeRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()



        const authenticateUser = new AuthenticationService(fakeRepository, fakeHashProvider)



        expect(authenticateUser.execute({
            email: 'jhondoe@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(Error)


    })


    it('should not be able to authenticate with a wrong password', async () => {

        const fakeRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()

        const createUser = new CreateUserService(fakeRepository, fakeHashProvider)

        const authenticateUser = new AuthenticationService(fakeRepository, fakeHashProvider)

        await createUser.execute({
            email: 'jhondoe@example.com',
            name: 'Jhon Doe',
            password: '123456'
        })

        expect(authenticateUser.execute({
            email: 'jhondoe@example.com',
            password: 'blalsoiasj'
        })
        ).rejects.toBeInstanceOf(AppError)


    })



})
