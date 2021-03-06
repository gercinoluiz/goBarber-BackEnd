import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fake/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService';


describe('UpdateAvatar', () => {
    it('should be able to update a avatar', async () => {

        const fakeStorageProvider = new FakeStorageProvider()
        const fakeUsersRepository = new FakeUsersRepository()

        const updateUserAvalatr = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)

        const user = await fakeUsersRepository.create({
            email: 'jhondoe@example.com',
            name: 'Jhon Doe',
            password: '123456'
        })

        await updateUserAvalatr.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg'
        })

        expect(user.avatar).toBe('avatar.jpg')

    })


    it('should not be able to update a user from a non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();


        const updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        expect(updateUserAvatar.execute({
            user_id: 'non-existing-user',
            avatarFileName: 'avatar.jpg',
        })).rejects.toBeInstanceOf(Error)

    })


    it('should delete old avatar when updating new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')


        const updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );


        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
        expect(user.avatar).toBe('avatar2.jpg')

    })

})
