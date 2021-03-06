import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import User from "@modules/users/infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe"

// import IHashProvider from "@modules/users/providers/HashProviders/models/IHashProvider"
import IHashProvider from "../providers/HashProviders/models/IHashProvider"



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

        // FIX: It returns undefined. Why?
        @inject("HashProvider")
        private hashProvider: IHashProvider,

        @inject("USersRepository")
        private userRepository: IUserRepository,







    ) { }

    public async execute({ email, password }: Request): Promise<Response> {


        const user = await this.userRepository.findByEmail(email) // It didint get it coreect at first because I didint search email as an DTO


        if (!user?.email) throw new AppError("Email or password does not match any result", 401) // exclamation mark says it might be undefined



        const compareMatched = await this.hashProvider.compareHash(password, user.password)
        // The code bellow return a true or false
        if (!compareMatched) {
            throw new AppError("Email or password does not match any result", 401)
        }

        const { secret } = auth.jwt


        if (!secret) {
            throw new AppError('Secret is wrong')
        }

        // I am creating the token
        const token = sign({}, secret, { subject: user.id, expiresIn: auth.jwt.expiresIn, })


        return { user, token }


    }

}


export default AuthenticationService
