import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import User from "@modules/users/infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import {inject, injectable} from "tsyringe"

import IHashProvider from "@modules/users/providers/HashProviders/models/IHashProvider"



interface Request {

    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

@injectable()
class AuthenticationService {

    constructor(
       @inject("USersRepository")

        private userRepository: IUserRepository,
        @inject("HashProvider")
        private hashProvider: IHashProvider


        ){

    }

    public async execute({ email, password }: Request): Promise<Response> {


        const user = await this.userRepository.findByEmail( email) // It didint get it coreect at first because I didint search email as an DTO


        if (!user?.email) throw new AppError("Email or password does not match any result", 401) // exclamation mark says it might be undefined

        // The code bellow return a true or false
        if (! await this.hashProvider.compareHash(password, user.password)) {
            throw new AppError("Email or password does not match any result", 401)
        }

        // I am creating the token
        const token = sign({}, auth.jwt.secret, { subject: user.id, expiresIn: auth.jwt.expiresIn, })


        return { user, token }


    }

}


export default AuthenticationService
