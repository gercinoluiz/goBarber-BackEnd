import { injectable, inject } from 'tsyringe';


import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    email: string
}


@injectable()

export default class SendForgotPasswordEmailService {
    constructor(
        @inject('USersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokenRepository')
        private userTokenRepository: IUserTokensRepository
    ) { }

    public async execute({ email }: IRequest): Promise<void> {

        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('User does not exists')
        }

       const {token} = await this.userTokenRepository.generate(user.id)


        await this.mailProvider.sendMail(email, `Pedido de reset de senha: ${token}`);


    }


}
