"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fake/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProviders/fakes/FakeHashProvider"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updadeProfileService;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updadeProfileService = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jon Doe',
      email: 'jondoe@example.com',
      password: '123456'
    });
    const updatedUser = await updadeProfileService.execute({
      user_id: user.id,
      email: 'jontre@example.com',
      name: "Jon Trê"
    });
    expect(updatedUser.name).toBe('Jon Trê');
    expect(updatedUser.email).toBe('jontre@example.com');
  });
  it('shoud not be able to change its email to an used one', async () => {
    await fakeUsersRepository.create({
      name: 'Jon Doe',
      email: 'jondoe@example.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      email: 'test@example.com',
      name: "Test",
      password: '123456'
    });
    await expect(updadeProfileService.execute({
      user_id: user.id,
      name: 'Jon Doe',
      email: 'jondoe@example.com'
    })).rejects.toBeInstanceOf(Error);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jon Doe',
      email: 'jondoe@example.com',
      password: '123456'
    });
    const updatedUser = await updadeProfileService.execute({
      user_id: user.id,
      email: user.email,
      old_password: '123456',
      password: '654321',
      name: 'Jon Doe'
    });
    expect(updatedUser.password).toBe('654321');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(updadeProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(Error);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(updadeProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      old_password: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(Error);
  });
});