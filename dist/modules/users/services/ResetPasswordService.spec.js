"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fake/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fake/FakeUserTokensRepository"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProviders/fakes/FakeHashProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let resetPassowrdService;
let fakeHashProvider;
describe('Reset Password', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPassowrdService = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassowrdService.execute({
      password: '123123',
      token
    });
    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe('123123');
  });
  it('should not be able to reset the password with a non-existing-user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('non-existing-user');
    await expect(resetPassowrdService.execute({
      password: '123456',
      token
    })).rejects.toBeInstanceOf(Error);
  });
  it('should not be able to reset a password after two hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jon Doe',
      password: '123456',
      email: 'jondoe@example.com'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id); // I am changing the date to be sent to the service with three more hours

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassowrdService.execute({
      password: '123456',
      token
    })).rejects.toBeInstanceOf(Error);
  });
});