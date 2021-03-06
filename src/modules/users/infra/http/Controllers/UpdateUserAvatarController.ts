import { Request, Response } from "express"
import { container } from "tsyringe"
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { classToClass } from 'class-transformer';




export default class UpdateUserAvatarController {

    public async update(request: Request, response: Response): Promise<Response> {


        const uploadAvatar = container.resolve(UpdateUserAvatarService)


        const user = await uploadAvatar.execute({ user_id: request.user.id, avatarFileName: request.file.filename })

        // const { password, ...responseUser } = user // Thats awesme!! I can remove any field that I dont whatn to show I took out the password field and the rest of them

        return response.status(200).json(classToClass( user))



        return response.json({ ok: true })


    }

}
