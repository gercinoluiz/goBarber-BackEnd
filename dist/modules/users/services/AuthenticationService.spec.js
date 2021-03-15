"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fake/FakeUsersRepository"));

var _AuthenticationService = _interopRequireDefault(require("./AuthenticationService"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProviders/fakes/FakeHashProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCashProvider = _interopRequireDefault(require("../../../shared/container/providers/CaheProvider/fakes/FakeCashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Authenticate', () => {
  it('should be able to authenticate', async () => {
    const fakeRepository = new _FakeUsersRepository.default();
    const fakeHashProvider = new _FakeHashProvider.default();
    const fakeCacheProvider = new _FakeCashProvider.default();
    const createUser = new _CreateUserService.default(fakeRepository, fakeHashProvider, fakeCacheProvider);
    const authenticateUser = new _AuthenticationService.default(fakeHashProvider, fakeRepository);
    const newUser = await createUser.execute({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      password: '123456'
    });
    const response = await authenticateUser.execute({
      email: 'jhondoe@example.com',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(newUser);
  });
  it('should not be able to authenticate with a non existing wuser', async () => {
    const fakeRepository = new _FakeUsersRepository.default();
    const fakeHashProvider = new _FakeHashProvider.default();
    const authenticateUser = new _AuthenticationService.default(fakeHashProvider, fakeRepository);
    expect(authenticateUser.execute({
      email: 'jhondoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(Error);
  });
  it('should not be able to authenticate with a wrong password', async () => {
    const fakeRepository = new _FakeUsersRepository.default();
    const fakeHashProvider = new _FakeHashProvider.default();
    const fakeCacheProvider = new _FakeCashProvider.default();
    const createUser = new _CreateUserService.default(fakeRepository, fakeHashProvider, fakeCacheProvider);
    const authenticateUser = new _AuthenticationService.default(fakeHashProvider, fakeRepository);
    await createUser.execute({
      email: 'jhondoe@example.com',
      name: 'Jhon Doe',
      password: '123456'
    });
    expect(authenticateUser.execute({
      email: 'jhondoe@example.com',
      password: 'blalsoiasj'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});