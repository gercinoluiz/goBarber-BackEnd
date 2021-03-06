
import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {

    public async show(request: Request, response: Response) {
        const user_id = request.user.id

        const showProfile = container.resolve(ShowProfileService)

        const user = await showProfile.execute({ user_id })

        const userWithOutPAssword = classToClass(user)

        
        return response.json(userWithOutPAssword)
    }


    public async update(request: Request, response: Response): Promise<Response> {  

        console.log('@DevLog ==> /ProfileControler/update')

        const user_id = request.body.user_id

        console.log('user_Id',user_id)

        const { name, email, old_password, password } = request.body


        const updateProfile = container.resolve(UpdateProfileService)

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        })

        const userWithOutPAssword = classToClass(user)

        console.log({
            userWithOutPAssword,
            user
        })

        return response.json(userWithOutPAssword)
    }

}
