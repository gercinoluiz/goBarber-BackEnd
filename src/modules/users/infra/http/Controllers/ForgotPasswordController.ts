import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from '../../../services/SendEmailProviderService';
import { json } from 'express';





export default class ForgotPasswordController {

        public async create(request: Request, response: Response): Promise<Response>{


            const {email} = request.body

            const sendForgotPasswordMail = container.resolve(
                SendForgotPasswordEmailService
            )

            await sendForgotPasswordMail.execute({
                email
            })

            return response.status(204).json()
        }

}
