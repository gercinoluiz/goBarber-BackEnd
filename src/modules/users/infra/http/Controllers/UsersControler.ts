import UserRepository from "@modules/users/infra/typeorm/repositories/UserRepository"
import {Request, Response} from "express"
import CreateUserService from "@modules/users/services/CreateUserService";
import {container} from "tsyringe"



export default class UsersController {

    public async create(request: Request, response: Response):Promise<Response> {
        const userRepository = new UserRepository()

        try {

            const { name, password, email } = request.body

            const createUser = container.resolve(CreateUserService)


            const user = await createUser.execute({ name, email, password }) // I had to pass it as a DTO (data transfer object)

            //  delete user.password;


            return response.json(user)

        } catch (error) {
            return response.status(400).json({ error: error.message })
        }





    }

}
