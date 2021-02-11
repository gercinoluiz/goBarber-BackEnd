

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ISendMailDTO from '../dtos/ISendMaiDTO';

interface IMessages {
    to: string,
    body: string
}



export default class FakeMailProvider implements IMailProvider {
    private messages: ISendMailDTO[] = []

    public async sendMail(message: ISendMailDTO): Promise<void> {

     this.messages.push(message);


    }


}
