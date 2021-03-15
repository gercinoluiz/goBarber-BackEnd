
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

import ICacheProvider from '../../../shared/container/providers/CaheProvider/models/ICacheProvider';
interface IRequest {
    user_id: string;
}

@injectable()
export default class ListProvidersService {

    constructor(
        @inject('USersRepository')
        private usersRepository: IUserRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) {

    }

    public async execute({ user_id }: IRequest): Promise<User[]> {

        let users = await this.cacheProvider.recover<User[]>(
            `providers-list:${user_id}`,
        )

        if (users){
            console.log('@DevLog-Data Base audit ==> All data are coming from Redis')

        }

        if (!users) {
            console.log('@DevLog-Data Base audit ==> We got nothing in Redis')

            users = await this.usersRepository.findlAllproviders({
                exept_user_id: user_id,
            });

            console.log('@DevLog-Data Base audit ==> A query has been done in PostGress')
        }

        await this.cacheProvider.save( `providers-list:${user_id}`, classToClass(users) )

        return users;
    }

}


