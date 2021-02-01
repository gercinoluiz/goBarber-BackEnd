

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '@modules/users/repositories/IUserRepository';

interface IMessages {
    to: string,
    body: string
}



export default class FakeMailProvider implements IMailProvider {
    private messages: IMessages[] = []

    public async sendMail(to: string, body: string): Promise<void> {

        this.messages.push({ to, body });


    }


}
