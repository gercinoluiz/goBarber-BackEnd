import "reflect-metadata"
import { inject, injectable } from "tsyringe";
import IUserRepository from '../repositories/IUserRepository';
import AppError from '../../../shared/errors/AppError';




interface IRequest {

    user_id: string
}



@injectable()
export default class ShowProfileService {

    constructor(

        @inject('USersRepository')
        private usersRepository: IUserRepository

    ) { }


    public async execute({ user_id }: IRequest) {

        const user = await this.usersRepository.findById(user_id)

        if (!user) {
            throw new AppError('No user found with this id')
        }

        return user

    }


}
