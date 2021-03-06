import AuthenticationService from "@modules/users/services/AuthenticationService";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository"
import {Request, Response} from "express"
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class SessionsController {

    public async create(request: Request, response: Response):Promise<Response> {

        console.log("SessionsController/create")

        const userRepository = new UserRepository()

        const { password, email } = request.body


        const AuthUser = container.resolve(AuthenticationService)


        let { user, token } = await AuthUser.execute({ password, email })

        // it refator my response
        user = classToClass(user)

        return response.json({ user, token })



    }

}
