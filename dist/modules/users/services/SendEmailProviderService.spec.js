"use strict";

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProviders/fakes/FakeHashProvider"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fake/FakeUsersRepository"));

var _SendEmailProviderService = _interopRequireDefault(require("./SendEmailProviderService"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fake/FakeUserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Forgot e-mail password', () => {
  let fakeUsersRepository;
  let fakeMailProvider;
  let fakeUserTokensRepository;
  let sendForgotPasswordEmailService;
  let fakeHashProvider;
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _FakeUserTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    sendForgotPasswordEmailService = new _SendEmailProviderService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it('should be able to recover the password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: "Jon Doe",
      email: "jondoe@example.com",
      password: '12345678'
    });
    await sendForgotPasswordEmailService.execute({
      email: "jondoe@example.com"
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmailService.execute({
      email: 'jondoe@example.com'
    })).rejects.toBeInstanceOf(Error);
  });
  it('should generate a fortot password token', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'Jon Doe',
      email: 'jondoe@example.com',
      password: '123456'
    });
    await sendForgotPasswordEmailService.execute({
      email: 'jondoe@example.com'
    });
    expect(generate).toHaveBeenCalledWith(user.id);
  });
});