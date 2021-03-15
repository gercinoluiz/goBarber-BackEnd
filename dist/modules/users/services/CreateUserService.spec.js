"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fake/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProviders/fakes/FakeHashProvider"));

var _FakeCashProvider = _interopRequireDefault(require("../../../shared/container/providers/CaheProvider/fakes/FakeCashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CreateUser', () => {
  it('should be able to create a brand new user', async () => {
    const fakeHashProvider = new _FakeHashProvider.default();
    const fakeRepository = new _FakeUsersRepository.default();
    const fakeCacheProvider = new _FakeCashProvider.default();
    const createUser = new _CreateUserService.default(fakeRepository, fakeHashProvider, fakeCacheProvider);
    const user = await createUser.execute({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create tow users with the same email', async () => {
    const fakeRepository = new _FakeUsersRepository.default();
    const fakeHashProvider = new _FakeHashProvider.default();
    const fakeCacheProvider = new _FakeCashProvider.default();
    const createUser = new _CreateUserService.default(fakeRepository, fakeHashProvider, fakeCacheProvider);
    await createUser.execute({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      password: '123456'
    });
    expect(createUser.execute({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      password: '123456'
    })).rejects.toBeInstanceOf(Error);
  });
});