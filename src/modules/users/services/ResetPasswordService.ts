import { th } from "date-fns/locale";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/IUserRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";
import IHashProvider from '../providers/HashProviders/models/IHashProvider';
import { addHours, isAfter } from "date-fns";
import AppError from '../../../shared/errors/AppError';




interface IRequest {
    token: string,
    password: string
}


@injectable()
export default class ResetPassowrdService {
    constructor(

        @inject('USersRepository')
        private userRepository: IUserRepository,

        @inject('UsersTokenRepository')
        private usersTokenRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider

    ) { }

    public async execute({ token, password }: IRequest): Promise<void> {

        const userToken = await this.usersTokenRepository.findByToken(token)

        if (!userToken) {
            throw new Error('token does not exists')
        }

        const user = await this.userRepository.findById(userToken.user_id)

        if (!user) {
            throw new Error('user does not exist')
        }

        const tokenDate = userToken.created_at
        const compareDate = addHours(tokenDate, 2);

        if (isAfter(Date.now(), compareDate)){
            throw new AppError('Token expired')
        }




        user.password = await this.hashProvider.generateHash(password)

        await this.userRepository.save(user)

    }
}
