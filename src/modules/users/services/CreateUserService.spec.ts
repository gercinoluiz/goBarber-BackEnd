import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository'
import CreateUserService from "@modules/users/services/CreateUserService"
import FakeHashProvider from "@modules/users/providers/HashProviders/fakes/FakeHashProvider"

describe('CreateUser', () => {

    it('should be able to create a brand new user', async () => {
        const fakeHashProvider = new FakeHashProvider()
        const fakeRepository = new FakeUsersRepository()
        const createUser = new CreateUserService(fakeRepository, fakeHashProvider)

        const user = await createUser.execute({
            email: 'jhondoe@example.com',
            name: 'Jhon Doe',
            password: '123456'
        })

        expect(user).toHaveProperty('id')

    })

    it('should not be able to create tow users with the same email', async () => {

        const fakeRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()

        const createUser = new CreateUserService(fakeRepository, fakeHashProvider)

        const user = await createUser.execute({
            email: 'jhondoe@example.com',
            name: 'Jhon Doe',
            password: '123456'
        })

        expect(createUser.execute({
            email: 'jhondoe@example.com',
            name: 'Jhon Doe',
            password: '123456'
        })
        ).rejects.toBeInstanceOf(Error)
    })

})
