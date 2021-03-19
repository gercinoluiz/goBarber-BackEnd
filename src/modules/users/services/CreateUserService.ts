import { getRepository } from "typeorm";

import User from "@modules/users/infra/typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe"
import { uuid } from "uuidv4";

import IHashProvider from "@modules/users/providers/HashProviders/models/IHashProvider"
import ICacheProvider from '../../../shared/container/providers/CaheProvider/models/ICacheProvider';


interface Request {

    name: string,
    password: string,
    email: string,
    isProvider:boolean

}

@injectable()

class CreateUserService {

    constructor(
        @inject("USersRepository")

        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,


        @inject('CacheProvider')
        private cacheProvider: ICacheProvider

    ) {

    }



    // appointment.id = uuid();
    // appointment.date = date;
    // appointment.provider_id = provider_id;


    public async execute({ name, password, email, isProvider }: Request): Promise<User> {



        // const usersRepository = getRepository(User)

        const checkeUser = await this.usersRepository.findByEmail(email)

        if (checkeUser) { throw new AppError('Email adress already used.') }

        const hashedPassword = await this.hashProvider.generateHash(password)

        const user = this.usersRepository.create({
            name,
            password: hashedPassword,
            email,
            isProvider,
            avatar: 'no-photo.jpg'
            
        
        })

        console.log('@DevLog-Data Base log ==> A new user has been created, we got to update Redis Cache')

        await this.cacheProvider.invalidatePrefix('providers-list')


        return user;

    }

}


export default CreateUserService;
