"use strict";

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProviders/fakes/FakeStorageProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fake/FakeUsersRepository"));

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UpdateAvatar', () => {
  it('should be able to update a avatar', async () => {
    const fakeStorageProvider = new _FakeStorageProvider.default();
    const fakeUsersRepository = new _FakeUsersRepository.default();
    const updateUserAvalatr = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
    const user = await fakeUsersRepository.create({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      password: '123456'
    });
    await updateUserAvalatr.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update a user from a non existing user', async () => {
    const fakeUsersRepository = new _FakeUsersRepository.default();
    const fakeStorageProvider = new _FakeStorageProvider.default();
    const updateUserAvatar = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
    expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFileName: 'avatar.jpg'
    })).rejects.toBeInstanceOf(Error);
  });
  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new _FakeUsersRepository.default();
    const fakeStorageProvider = new _FakeStorageProvider.default();
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const updateUserAvatar = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    });
    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});