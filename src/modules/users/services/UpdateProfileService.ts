import { inject, injectable } from "tsyringe";
import IUSersRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '../providers/HashProviders/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';




interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
export default class UpdateProfileService {

    constructor(

        @inject('USersRepository')
        private usersRepository: IUSersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider


    ) {


    }


    public async execute({ user_id,
        name,
        email,
        old_password,
        password }: IRequest): Promise<User> {

        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('No user found with the due id')
        }


        const isEmailRepeated = await this.usersRepository.findByEmail(email)


        if (isEmailRepeated && isEmailRepeated.id !== user.id) {
            throw new AppError('Email already in use')
        }


        user.name = name
        user.email = email


        if (password && !old_password) {
            throw new AppError('You gotta inform the old password')
        }

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(user.password, old_password)

            if (!checkOldPassword){
                throw new AppError('Old password does not match.');

            }

            user.password = await this.hashProvider.generateHash(password)

        }



        return this.usersRepository.save(user)

    }


}
