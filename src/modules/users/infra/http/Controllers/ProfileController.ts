
import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';

export default class ProfileController {

    public async show(request: Request, response: Response) {
        const user_id = request.user.id

        const showProfile = container.resolve(ShowProfileService)

        const user = await showProfile.execute({ user_id })

        const userWithOutPAssword = {

            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        }

        return response.json(userWithOutPAssword)
    }


    public async update(request: Request, response: Response): Promise<Response> {

        const user_id = request.body.user_id

        const { name, email, old_password, password } = request.body


        const updateProfile = container.resolve(UpdateProfileService)

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        })


        const userWithOutPAssword = {

            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        }

        return response.json(userWithOutPAssword)
    }

}
