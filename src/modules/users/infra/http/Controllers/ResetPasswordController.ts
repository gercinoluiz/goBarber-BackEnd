
import ResetPassowrdService from '@modules/users/services/ResetPasswordService';
import { Request } from 'express';
import { Response } from 'express';
import { container } from 'tsyringe';



export default class ResetPasswordController {

    public async create(request: Request, respose: Response): Promise<Response> {


        const { token, password } = request.body

        const resetPasswordService = container.resolve(ResetPassowrdService)

        await resetPasswordService.execute({
            password, token
        })


        return respose.status(204).json()
    }

}
