import AuthenticationService from "@modules/users/services/AuthenticationService";
import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository"
import {Request, Response} from "express"

export default class SessionsController {

    public async create(request: Request, response: Response):Promise<Response> {


        const userRepository = new UserRepository()

        const { password, email } = request.body


        const AuthUser = new AuthenticationService(userRepository);


        const { user, token } = await AuthUser.execute({ password, email })


        return response.json({ user, token })



    }

}
