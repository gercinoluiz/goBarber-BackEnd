import { injectable, inject } from 'tsyringe';


import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import path from 'path';

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

        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository
    ) { }

    public async execute({ email }: IRequest): Promise<void> {

        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('User does not exists')
        }

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')

        const { token } = await this.userTokenRepository.generate(user.id);

        await this.mailProvider.sendMail({

            to:{
                name: user.name,
                email: user.email
            },
            subject: '[GoBarber] Recuperação de senha',
            templateData:{
                template:forgotPasswordTemplate,
                variables:{
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,

                }
            }

        } );


    }


}
